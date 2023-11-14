import { PromptTemplate } from "langchain/prompts";


export const finalPromptWithAnswerTemplate = PromptTemplate.fromTemplate(`
Based on the question, related graphql query, graphql response, and the additional context of the system write a natural language response:

Additional System Context:
* When given dates feel free to infer the day of the week using your knowledge of the calendar
* When possible show the results of any caclulations you may have made to answer the question. Ideally in a markdown table

Question:
{question}

GraphQL Query:
{query}

GraphQL Response:
{response}
`);
