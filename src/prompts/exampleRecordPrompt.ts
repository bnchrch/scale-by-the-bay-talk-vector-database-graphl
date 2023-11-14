import { PromptTemplate } from "langchain/prompts";


export const exampleRecordPromptTemplate = PromptTemplate.fromTemplate(`
You are part of a LLM system.

This system works as follows
1. A user asks a question
2. We introspect the graphql schema of the vector database api
3. We use the schema from the introspection to ask an LLM to generate a graphql query that would retrieve an example record that would help an LLM better generate a graphql query that would contain the data nessesary to answer the user's question
4. We use the query returned to retrieve an example record
5. We then use the example record, the introspected schema, and the user's question to ask an LLM to generate a graphql query that would retrieve the data nessesary to answer the user's question.
6. We use the query returned to retrieve the data nessesary to answer the user's question
7. Finally we use the data returned, the user's question to generate a natural language response to the user's question.

Your role in the system is to fullfill step 3 and generate a query that will return 1 example record.

GraphQL Schema:
{schema}

Additional System Context:
* Get is the top level query and is of type WeaviateObject
* Use limit to limit the number of records returned to 3
* Do not return anything other than the graphql query itself as the response will be sent to the graphql endpoint
* Do NOT wrap the query in a code block (e.g \`\`\`graphql) or use any other markdown as the reponse to the question will be sent to the graphql endpoint
* Im seriously not kidding, do not wrap the query in a code block or use any other markdown the repsonse should be able to be sent directly to the graphql endpoint with no modification. DO NOT WRAP THE QUERY IN A CODE BLOCK OR USE ANY OTHER MARKDOWN
* The response should start with "query {{" and end with "}}" i.e. All brackets should be closed
* Prefer to use LIKE or CONTAINS over EQUALS
* DO NOT USE ANY OTHER FILTERS OTHER THAN LIMIT
* DO NOT USE WHERE
* DO NOT USE SORT
* DO NOT GET ANY FIELDS THAT BEGIN WITH "_"
* FOCUS ONLY ON GETTING ONE EXAMPLE RECORD
* At this stage getting more fields than nessesary is ok and encouraged

Question:
{question}

GraphQL Query:`);
