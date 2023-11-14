
import { printSchema, getIntrospectionQuery, IntrospectionQuery, buildClientSchema } from "graphql"


import { OpenAI } from "langchain/llms/openai";
import { SECRET_OPEN_AI_KEY } from "../config";
import { logToFile, logJsonToFile, logSchemaToFile } from "./helpers";
import { removeAllUnessesaryWeaviateTypes } from "./weaviate/introspection";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { retrievalPromptTemplate } from "./prompts/retrievalQueryPrompt";
import { finalPromptWithAnswerTemplate } from "./prompts/finalPrompt";
import { exampleRecordPromptTemplate } from "./prompts/exampleRecordPrompt";
import { runWeaviateQuery } from "./weaviate/client";

// Set to false to enable aggregation queries
// Note: You may want to update the retrieval prompt to coerce the model to return aggregation queries
const REDUCE_INTROSPECTION = true;
const MAX_RETRIES = 5;

// MODELS

// const OPENAI_MODEL_NAME = "gpt-3.5-turbo-0613"
const OPENAI_MODEL_NAME = "gpt-4-1106-preview"


const openAIModel = new OpenAI({
  openAIApiKey: SECRET_OPEN_AI_KEY,
  temperature: 0,
  verbose: true,
  modelName: OPENAI_MODEL_NAME,
});

const openAIEmbeddings = new OpenAIEmbeddings({
  openAIApiKey: SECRET_OPEN_AI_KEY,
  modelName: OPENAI_MODEL_NAME,
});



// WEAVIATE

const introspectWeaviate = async () => {
  const introspectionQuery = getIntrospectionQuery();
  logToFile("0b-introspection_input.graphql", introspectionQuery);
  const response = await runWeaviateQuery(introspectionQuery) as IntrospectionQuery
  return response;
}

const getWeaviateSchema = async () => {
  const introspectionResponse = await introspectWeaviate()

  // Log the intro spection schema
  logJsonToFile("1a-original_schema.json", introspectionResponse)
  const introspectionSchemaObj = buildClientSchema(introspectionResponse);
  logSchemaToFile("1b-original_pretty_schema.graphql", introspectionSchemaObj)

  // trim the schema only to the types we need
  const reducedIntrospection = REDUCE_INTROSPECTION
    ? removeAllUnessesaryWeaviateTypes(introspectionResponse)
    : introspectionResponse;

  const reducedGraphqlSchemaObj = buildClientSchema(reducedIntrospection);

  // Log the reduced schema
  logJsonToFile("1c-reduced_schema.json", reducedIntrospection)
  logSchemaToFile("1d-reduced_pretty_schema.graphql", reducedGraphqlSchemaObj)

  const prettySchema = printSchema(reducedGraphqlSchemaObj);

  return prettySchema;
}

// LANGCHAIN


const _ask = async (question: string) => {
  logToFile("0-question_input.txt", question);

  /*
    Get the vector for the question and the graphql schema
  */

  const vector = await openAIEmbeddings.embedQuery(question);
  const vectorString = JSON.stringify(vector)
  logToFile("0a-vector_input.txt", vectorString);

  const schema = await getWeaviateSchema()

  /*
    Get an Example Record
  */

  const exampleRecordPrompt = await exampleRecordPromptTemplate.format({
    question,
    schema,
  });

  logToFile("2a-example_record_prompt.txt", exampleRecordPrompt);

  const exampleRecordPromptResponse = await openAIModel.invoke(exampleRecordPrompt);

  logToFile("2b-example_record_prompt_response.graphql", exampleRecordPromptResponse);

  const exampleRecordQuery = exampleRecordPromptResponse;
  const exampleRecordQueryResponse = await runWeaviateQuery(exampleRecordQuery)
  const exampleRecordQueryResponsePretty = JSON.stringify(exampleRecordQueryResponse, null, 2);

  logToFile("2c-example_record_query_reponse.graphql", exampleRecordQueryResponsePretty);

  /*
    Get the Retrieval Query
  */

  const retrievalPrompt = await retrievalPromptTemplate.format({
    question,
    schema,
    relatedRecords: exampleRecordQueryResponsePretty,
  });

  logToFile("3a-retrieval_prompt.txt", retrievalPrompt);

  const retrievalPromptResponse = await openAIModel.invoke(retrievalPrompt);
  const retrievalPromptResponseWithVector = retrievalPromptResponse.replace("$VECTOR", vectorString);

  logToFile("3b-retrieval_prompt_response.graphql", retrievalPromptResponseWithVector);

  const queryToRun = retrievalPromptResponseWithVector;
  const queryToRunResponse = await runWeaviateQuery(queryToRun)
  const queryToRunResponsePretty = JSON.stringify(queryToRunResponse, null, 2);

  logToFile("3c-retrieval_query_response.graphql", queryToRunResponsePretty);

  /*
   Get the answer
  */

  const finalPromptWithAnswer = await finalPromptWithAnswerTemplate.format({
    question,
    query: queryToRun,
    response: queryToRunResponsePretty,
  });

  logToFile("4a-final_prompt.txt", finalPromptWithAnswer);

  const finalResponse = await openAIModel.invoke(finalPromptWithAnswer);

  logToFile("4b-final_prompt_response.txt", finalResponse);
}

const ask = async (question: string, retries = 0) => {
  try {
    await _ask(question)
  } catch (e) {
    console.error(e)
    if (retries < MAX_RETRIES) {
      console.log(`Retrying ${retries + 1} time`)
      await ask(question, retries + 1)
    }
  }
}

/*
  QUESTIONS
*/

await ask("How many VirtualRide activities have I done in total relative to all other activities?")
// await ask("If you divided up months into quarters, which quarter do I typically exercise the most? The 1st, 2nd, 3rd or 4th quarter? You can determine most by the sum of elasped time")
// await ask("What activity do I do the most? i.e. sum of total elapsed time")
// await ask("Does my prefered activity change over the course of the year? i.e. do I do different activities in the winter vs the summer?")
// await ask("How many of my rides have been Virtual Rides? We can tell if a ride is virtual if the type is VirtualRide. Answer this using the GraphQL Endpoints Aggregate functions.")
// await ask("How many of my virtual rides have been in New Zealand? We can tell if a virtual island is in New Zealand by looking at the name fields of the activity. So Please Rely only on the nearVector filter, do not add any of your own")
// await ask("How many of my virtual rides have been in New Zealand?")
