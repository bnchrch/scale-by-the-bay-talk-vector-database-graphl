import { PromptTemplate } from "langchain/prompts";


// * There can only be one where clause
// * When filtering on dates you must use valueDate and not valueString

// Unused Aggregation prompts
// * Instead of "where" filters lets us "nearVector" filters instead. e.g. Activities(nearVector: {{vector: [...], distance: 0.8}}) NOT Activities(where: {{operands: [...], operator: AND}})
// * DO NOT USE "where" filters, instead use "nearVector" filters instead. e.g. Activities(nearVector: {{vector: $VECTOR, distance: 0.8}}) NOT Activities(where: {{operands: [...], operator: AND}})
// * Use the string $VECTOR to represent the vector of the question. e.g. Activities(nearVector: {{vector: $VECTOR, distance: 0.8}}). The system will replace $VECTOR with the vector of the question


export const retrievalPromptTemplate = PromptTemplate.fromTemplate(`
Based on the graphql schema below, the example record, and the additional context of the system, write a graphql query that would retrieve the data nessesary to answer the user's question:

GraphQL Schema:
{schema}

Example Related Records:
{relatedRecords}

Additional System Context:
* Fields are often stringified json objects
* Do not assume the structure or keys of the object
* When using where the path, operator and one of value fields are required
* Get is the top level query and is of type WeaviateObject
* When querying activities, assume that all entries are related to the user asking the question and there is no need to filter by athlete
* Do not return anything other than the graphql query itself as the response will be sent to the graphql endpoint
* Do NOT wrap the query in a code block (e.g \`\`\`graphql) or use any other markdown as the reponse to the question will be sent to the graphql endpoint
* Im seriously not kidding, do not wrap the query in a code block or use any other markdown the repsonse should be able to be sent directly to the graphql endpoint with no modification. DO NOT WRAP THE QUERY IN A CODE BLOCK OR USE ANY OTHER MARKDOWN
* The response must start with "query {{ Get {{" and end with "}}" i.e. All brackets should be closed
* For activities often hints for locations are given in the name field
* The Type of ride is given in the type field of activities
* Be very precise about the fields you select, ensure they actually exists before selecting them, you can know if a field exists if it under the "fields" section of the object in the schema
* Instead of "where" filters lets us "nearVector" filters instead. e.g. Activities(nearVector: {{vector: [...], distance: 0.8}}) NOT Activities(where: {{operands: [...], operator: AND}})
* DO NOT USE "where" filters, instead use "nearVector" filters instead. e.g. Activities(nearVector: {{vector: $VECTOR, distance: 0.8}}) NOT Activities(where: {{operands: [...], operator: AND}})
* Use the string $VECTOR to represent the vector of the question. e.g. Activities(nearVector: {{vector: $VECTOR, distance: 0.8}}). The system will replace $VECTOR with the vector of the question
* DO NOT GET ANY FIELDS THAT BEGIN WITH "_"

Question:
{question}

GraphQL Query:`);
