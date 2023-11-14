import { IntrospectionQuery, IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";
import { flow, omit, get, set, map, filter, isNull, isString, omitBy } from "lodash/fp";

import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { IntrospectionQuery } from "graphql";
import { flow, omit } from "lodash/fp";
import { flow, omit } from "lodash/fp";
import { USELESS_TOP_LEVEL_FIELDS, omitUnusedTypes } from "./weaviate/introspection";
import { USELESS_TOP_LEVEL_FIELDS, omitUnusedTypes } from "./weaviate/introspection";
import { USELESS_TOP_LEVEL_FIELDS, omitUnusedTypes } from "./introspection";


const USELESS_FIELDS = [
  "deprecationReason",
  "isDeprecated",
  "possibleTypes",
  "ofType",
];
const DISABLED_TYPE_SUBSTRINGS = [
  "Aggregate",
  "Group",
  "Directive",
  "Schema",
  "Near",
  "__TypeKind",
  "QnATransformers",
  "FusionEnum",
  "Reranker",
  "Answer",
  "__EnumValue",
  "Classification",
  "__InputValue",
  // "ENUM",
  // "InpObj",
  "rerank",
  "Reranker",
  "HybridInpObj",
  "Bm25InpObj",
  "VectorInpObj",
  "AskInpObj",
  "SortInpObj",
  "NearObjectInpObj",
  "GroupInpObj",
  "GeoRangeInpObj",
  "GeoRangeDistanceInpObj",
  "GeoCoordinatesInpObj",
];
export const USELESS_TOP_LEVEL_FIELDS = [
  "__schema.mutationType",
  "__schema.subscriptionType",
  "__schema.directives",
];
// HELPERS
const isAutoGenDescription = (description: any) => {
  if (!isString(description)) {
    return false;
  }
  const lower = description.toLowerCase();
  return lower.includes("auto-schema");
};
const isNullEmptyOrUseless = (val: any) => {
  return isNull(val) || val === "" || isAutoGenDescription(val);
};
// GRAPHQL
const omitUselessAndUnusedFields = (type: any) => {
  return flow(
    // omit certain attributes
    omit(USELESS_FIELDS),
    omitBy(isNullEmptyOrUseless)
  )(type);
};
const omitType = (type: any) => {
  const topLevelName = get("name", type);
  const ofTypeName = get("ofType.name", type);

  const name = topLevelName || ofTypeName;

  if (!name) {
    return true;
  }
  const lowerName = name.toLowerCase();

  if (DISABLED_TYPE_SUBSTRINGS.some(s => lowerName.includes(s.toLowerCase()))) {
    return false;
  }

  return true;
};
const omitUnusedFields = (key: string) => (type: any) => {
  const fields = get(key, type);
  if (!fields) {
    return type;
  }

  const newFields = flow(
    // omit certain attributes
    map(omitUselessAndUnusedFields),
    filter(f => omitType(get("type", f))),
    map(omitUnusedFields("args"))
  )(fields);

  return set(key, newFields, type);
};
export const omitUnusedTypes = (introspectionResponse: IntrospectionQuery) => {
  const types = get("__schema.types", introspectionResponse);
  const newTypes = flow(
    // omit certain attributes
    filter(omitType),
    map(omitUnusedFields("fields")),
    map(omitUnusedFields("inputFields")),
    map(omitUselessAndUnusedFields)
  )(types);


  const newResponse = set("__schema.types", newTypes, introspectionResponse);
  return newResponse;
};export const removeAllUnessesaryWeaviateTypes = (weaviateIntrospectionQuery: IntrospectionQuery) => {
  return flow(
    omit(USELESS_TOP_LEVEL_FIELDS),
    omitUnusedTypes
  )(weaviateIntrospectionQuery);
};

