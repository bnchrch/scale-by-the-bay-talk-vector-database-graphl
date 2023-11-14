import { GraphQLSchema, printSchema } from "graphql";
import fs from "fs";

const LOG_DIR = "logs";

export const logToFile = (file_name: string, str: string) => {
  const consoleHeader = `======================== ${file_name} START ========================`;
  const consoleFooter = `======================== ${file_name} END ========================`;
  console.log(consoleHeader);
  console.log(str);
  console.log(consoleFooter);
  fs.writeFileSync(`${LOG_DIR}/${file_name}`, str);
};
export const logJsonToFile = (file_name: string, obj: any) => {
  logToFile(file_name, JSON.stringify(obj, null, 2));
};
export const logSchemaToFile = (file_name: string, graphqlSchemaObj: GraphQLSchema) => {
  const prettySchema = printSchema(graphqlSchemaObj);
  logToFile(file_name, prettySchema);
};
