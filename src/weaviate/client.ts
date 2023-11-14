import { request } from "graphql-request";
import { SECRET_WEAVIATE_API_KEY } from "../config";

import { SECRET_WEAVIATE_API_KEY } from "../../config";


const WEAVIATE_GRAPHQL_ENDPOINT = "https://strava-test-1-uyfedfbp.weaviate.network/v1/graphql";
export const runWeaviateQuery = async (query: string) => {
  const response = await request({
    url: WEAVIATE_GRAPHQL_ENDPOINT,
    document: query,
    requestHeaders: {
      Authorization: `Bearer ${SECRET_WEAVIATE_API_KEY}`,
    }
  });

  return response;
};
