// import os
// import pinecone
// from langchain.chains import RetrievalQA
// from langchain.embeddings import OpenAIEmbeddings
// from langchain.llms import OpenAI
// from langchain.vectorstores import Pinecone

// embeddings = OpenAIEmbeddings()
// pinecone.init(api_key=os.environ["PINECONE_KEY"], environment=os.environ["PINECONE_ENV"])
// index = pinecone.Index(os.environ["PINECONE_INDEX"])
// vector_store = Pinecone(index, embeddings.embed_query, "text")

// qa = RetrievalQA.from_chain_type(llm=OpenAI(temperature=0), chain_type="stuff", retriever=vector_store.as_retriever())

// print("Connector development help bot. What do you want to know?")
// while True:
//     query = input("")
//     answer = qa.run(query)
//     print(answer)
//     print("\nWhat else can I help you with:")



import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain } from "langchain/chains";

const pinecone = new Pinecone({
	apiKey: "YOUR KEY",
	environment: "gcp-starter",
});

console.log("Getting index...");
const pineconeIndex = pinecone.Index("joe-test");


const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(),
  { pineconeIndex }
);

/* Use as part of a chain (currently no metadata filters) */
const model = new OpenAI();
const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
  k: 5,
  returnSourceDocuments: true,
});
const response = await chain.call({ query: "summarize bnchrch's 5 most recent comments" });
console.log(response);

debugger;
// Create a new index