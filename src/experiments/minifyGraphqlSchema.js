function graphqlSchemaMinifier(schema) {
  let legend = {};
  let minified = {};

  let currentIndex = 0;
  let baseChars = "0123456789abcdefghijklmnopqrstuvwxyz";
  let currentPrefix = "";

  function getNextKey() {
    let str = currentPrefix + baseChars[currentIndex];
    currentIndex++;

    if (currentIndex >= baseChars.length) {
      currentIndex = 0;
      currentPrefix = currentPrefix ? getNextChar(currentPrefix) : baseChars[0];
    }

    return str;
  }

  function getNextChar(c) {
    let pos = baseChars.indexOf(c[c.length - 1]);

    if (pos + 1 >= baseChars.length) {
      return getNextChar(c.slice(0, -1)) + baseChars[0];
    }

    return c.slice(0, -1) + baseChars[pos + 1];
  }

  function transformNode(node) {
    if (typeof node === 'object' && node !== null) {
      if (Array.isArray(node)) {
        return node.map(item => transformNode(item));
      } else {
        let minifiedNode = {};
        for (let key in node) {
          if (!legend[key]) {
            legend[key] = getNextKey();
          }
          minifiedNode[legend[key]] = transformNode(node[key]);
        }
        return minifiedNode;
      }
    } else {
      if (node !== null && !legend[node]) {
        legend[node] = getNextKey();
      }
      return node !== null ? legend[node] : node;
    }
  }

  minified = transformNode(schema);

  return {
    legend: legend,
    minified: minified
  };
}

// Test:
let schema = {
	"data": {
		"__schema": {
			"mutationType": null,
			"queryType": {
				"name": "WeaviateObj"
			},
			"types": [
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "Aggregate this property\"_ab_record_id\"",
							"name": "_ab_record_id",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommits_ab_record_idObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"_ab_stream\"",
							"name": "_ab_stream",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommits_ab_streamObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"author\"",
							"name": "author",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsauthorObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"branch\"",
							"name": "branch",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsbranchObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"comments_url\"",
							"name": "comments_url",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitscomments_urlObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"commit\"",
							"name": "commit",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitscommitObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"committer\"",
							"name": "committer",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitscommitterObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"created_at\"",
							"name": "created_at",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitscreated_atObj"
							}
						},
						{
							"args": [],
							"description": "Indicates the group of returned data",
							"name": "groupedBy",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsGroupedByObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"html_url\"",
							"name": "html_url",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitshtml_urlObj"
							}
						},
						{
							"args": [],
							"description": "An object used to Get Meta information about Objects on a local Weaviate",
							"name": "meta",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsMetaObject"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"node_id\"",
							"name": "node_id",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsnode_idObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"parents\"",
							"name": "parents",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsparentsObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"repository\"",
							"name": "repository",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsrepositoryObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"sha\"",
							"name": "sha",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsshaObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"text\"",
							"name": "text",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitstextObj"
							}
						},
						{
							"args": [],
							"description": "Aggregate this property\"url\"",
							"name": "url",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateCommitsurlObj"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommits"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "score",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalReranker"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "basedOn",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "classifiedFields",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "completed",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "scope",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalClassification"
				},
				{
					"description": "String or String[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "TextStringAggregateObjectsCommits"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The distance from the point specified via geoCoordinates.",
							"name": "distance",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "The geoCoordinates that form the center point of the search.",
							"name": "geoCoordinates",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsWhereGeoRangeInpObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The longitude (in decimal format) of the geoCoordinates to search around.",
							"name": "longitude",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "The latitude (in decimal format) of the geoCoordinates to search around.",
							"name": "latitude",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsWhereGeoRangeGeoCoordinatesInpObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "GetObjectsCommitsSortInpObjTypeEnum"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "GetObjectsCommitsGroupInpObjTypeEnum"
				},
				{
					"description": "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
					"fields": [
						{
							"args": [],
							"description": "A list of all directives supported by this server.",
							"name": "directives",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "If this server supports mutation, the type that mutation operations will be rooted at.",
							"name": "mutationType",
							"type": {
								"kind": "OBJECT",
								"name": "__Type"
							}
						},
						{
							"args": [],
							"description": "The type that query operations will be rooted at.",
							"name": "queryType",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "If this server supports subscription, the type that subscription operations will be rooted at.",
							"name": "subscriptionType",
							"type": {
								"kind": "OBJECT",
								"name": "__Type"
							}
						},
						{
							"args": [],
							"description": "A list of all types supported by this server.",
							"name": "types",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "__Schema"
				},
				{
					"description": "Hybrid search",
					"fields": null,
					"inputFields": [
						{
							"description": "Query string",
							"name": "query",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "Search weight",
							"name": "alpha",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"description": "Vector search",
							"name": "vector",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsHybridInpObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsauthorTopOccurrencesObj"
				},
				{
					"description": "String or String[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "TextDateGetObjectsCommits"
				},
				{
					"description": "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
					"fields": [
						{
							"args": [],
							"description": "A GraphQL-formatted string representing the default value for this input value.",
							"name": "defaultValue",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "type",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "__InputValue"
				},
				{
					"description": "An object containing filter options for a local Get query, used to convert the result to the specified filters",
					"fields": null,
					"inputFields": [
						{
							"description": "Specify an Integer value that the target property will be compared to",
							"name": "valueInt",
							"type": {
								"kind": "SCALAR",
								"name": "IntAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a Boolean value that the target property will be compared to",
							"name": "valueBoolean",
							"type": {
								"kind": "SCALAR",
								"name": "BooleanAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueString",
							"type": {
								"kind": "SCALAR",
								"name": "TextStringAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a Text value that the target property will be compared to",
							"name": "valueText",
							"type": {
								"kind": "SCALAR",
								"name": "TextAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueDate",
							"type": {
								"kind": "SCALAR",
								"name": "TextDateAggregateObjectsCommits"
							}
						},
						{
							"description": "Contains the Operators that can be applied to a 'where' filter",
							"name": "operator",
							"type": {
								"kind": "ENUM",
								"name": "AggregateObjectsCommitsWhereOperatorEnum"
							}
						},
						{
							"description": "Specify a Float value that the target property will be compared to",
							"name": "valueNumber",
							"type": {
								"kind": "SCALAR",
								"name": "FloatAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point.",
							"name": "valueGeoRange",
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "AggregateObjectsCommitsWhereGeoRangeInpObj"
							}
						},
						{
							"description": "Contains the Operands that can be applied to a 'where' filter",
							"name": "operands",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object)",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsWhereInpObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsparentsObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The required degree of similarity between an object's characteristics and the provided filter values",
							"name": "distance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"description": "Target vector to be used in kNN search",
							"name": "vector",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).",
							"name": "certainty",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsNearVectorInpObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "FusionEnum"
				},
				{
					"description": "String or String[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "TextGetObjectsCommits"
				},
				{
					"description": "Boolean or Boolean[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "BooleanGetObjectsCommits"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The maximum distance from the point specified geoCoordinates.",
							"name": "max",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsWhereGeoRangeDistanceInpObj"
				},
				{
					"description": "An object containing the Operators that can be applied to a 'where' filter",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "GetObjectsCommitsWhereOperatorEnum"
				},
				{
					"description": "An object containing the Operands that can be applied to a 'where' filter",
					"fields": null,
					"inputFields": [
						{
							"description": "Contains the Operands that can be applied to a 'where' filter",
							"name": "operands",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify a Boolean value that the target property will be compared to",
							"name": "valueBoolean",
							"type": {
								"kind": "SCALAR",
								"name": "BooleanAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a Float value that the target property will be compared to",
							"name": "valueNumber",
							"type": {
								"kind": "SCALAR",
								"name": "FloatAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point.",
							"name": "valueGeoRange",
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "AggregateObjectsCommitsWhereGeoRangeInpObj"
							}
						},
						{
							"description": "Specify a Text value that the target property will be compared to",
							"name": "valueText",
							"type": {
								"kind": "SCALAR",
								"name": "TextAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueDate",
							"type": {
								"kind": "SCALAR",
								"name": "TextDateAggregateObjectsCommits"
							}
						},
						{
							"description": "Contains the Operators that can be applied to a 'where' filter",
							"name": "operator",
							"type": {
								"kind": "ENUM",
								"name": "AggregateObjectsCommitsWhereOperatorEnum"
							}
						},
						{
							"description": "Specify an Integer value that the target property will be compared to",
							"name": "valueInt",
							"type": {
								"kind": "SCALAR",
								"name": "IntAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueString",
							"type": {
								"kind": "SCALAR",
								"name": "TextStringAggregateObjectsCommits"
							}
						},
						{
							"description": "Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object)",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsWhereOperandsInpObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsurlObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsauthorObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The required degree of similarity between an object's characteristics and the provided filter values",
							"name": "distance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"description": "Concept identifier in the uuid format",
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id",
							"name": "beacon",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).",
							"name": "certainty",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsNearObjectInpObj"
				},
				{
					"description": "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document. \n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "args",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "locations",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "__Directive"
				},
				{
					"description": "An object containing filter options for a local Get query, used to convert the result to the specified filters",
					"fields": null,
					"inputFields": [
						{
							"description": "Question to be answered",
							"name": "question",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "Properties which contains text",
							"name": "properties",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "QnATransformersAggregateCommitsAskInpObj"
				},
				{
					"description": "An object containing the Operators that can be applied to a 'where' filter",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "AggregateObjectsCommitsWhereOperatorEnum"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "answer",
							"type": {
								"kind": "OBJECT",
								"name": "CommitsAdditionalAnswer"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "certainty",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "classification",
							"type": {
								"kind": "OBJECT",
								"name": "CommitsAdditionalClassification"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "creationTimeUnix",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "distance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "explainScore",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "group",
							"type": {
								"kind": "OBJECT",
								"name": "CommitsAdditionalGroup"
							}
						},
						{
							"args": [],
							"description": "The UUID of a Object, assigned by its local Weaviate",
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "lastUpdateTimeUnix",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [
								{
									"description": "Properties which contains text",
									"name": "query",
									"type": {
										"kind": "SCALAR",
										"name": "String"
									}
								},
								{
									"description": "Property to rank from",
									"name": "property",
									"type": {
										"kind": "SCALAR",
										"name": "String"
									}
								}
							],
							"description": "",
							"name": "rerank",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "score",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "vector",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditional"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "Aggregate on the maximum of numeric property values",
							"name": "maximum",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "Aggregate on the median of numeric property values",
							"name": "median",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "Aggregate on the minimum of numeric property values",
							"name": "minimum",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "Aggregate on the mode of numeric property values",
							"name": "mode",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscreated_atObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscommitObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscommitterTopOccurrencesObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscomments_urlTopOccurrencesObj"
				},
				{
					"description": "An object containing filter options for a local Get query, used to convert the result to the specified filters",
					"fields": null,
					"inputFields": [
						{
							"description": "Specify the path from the Objects fields to the property name (e.g. ['Get', 'City', 'population'] leads to the 'population' property of a 'City' object)",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify the sort order, either ascending (asc) which is default or descending (desc)",
							"name": "order",
							"type": {
								"kind": "ENUM",
								"name": "GetObjectsCommitsSortInpObjTypeEnum"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsSortInpObj"
				},
				{
					"description": "Location of the root query",
					"fields": [
						{
							"args": [],
							"description": "Filter options for a local Aggregate query, used to convert the result to the specified filters",
							"name": "Aggregate",
							"type": {
								"kind": "OBJECT",
								"name": "AggregateObjectsObj"
							}
						},
						{
							"args": [],
							"description": "Get Objects on a local Weaviate",
							"name": "Get",
							"type": {
								"kind": "OBJECT",
								"name": "GetObjectsObj"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "WeaviateObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommits_ab_streamTopOccurrencesObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsurlTopOccurrencesObj"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "distance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "vector",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalGroupHitsAdditional"
				},
				{
					"description": "An object containing the path and value of the grouped property",
					"fields": [
						{
							"args": [],
							"description": "The path of the grouped property",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "The value of the grouped property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsGroupedByObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsparentsTopOccurrencesObj"
				},
				{
					"description": "Int or Int[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "IntGetObjectsCommits"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The distance from the point specified via geoCoordinates.",
							"name": "distance",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "The geoCoordinates that form the center point of the search.",
							"name": "geoCoordinates",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsWhereGeoRangeInpObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The latitude (in decimal format) of the geoCoordinates to search around.",
							"name": "latitude",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "The longitude (in decimal format) of the geoCoordinates to search around.",
							"name": "longitude",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsWhereGeoRangeGeoCoordinatesInpObj"
				},
				{
					"description": "Boolean or Boolean[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "BooleanAggregateObjectsCommits"
				},
				{
					"description": "Float or Float[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "FloatAggregateObjectsCommits"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsnode_idTopOccurrencesObj"
				},
				{
					"description": "The `Boolean` scalar type represents `true` or `false`.",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "Boolean"
				},
				{
					"description": "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "__DirectiveLocation"
				},
				{
					"description": "Int or Int[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "IntAggregateObjectsCommits"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The query to search for",
							"name": "query",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "The properties to search in",
							"name": "properties",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsHybridGetBm25InpObj"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "Record ID, used for bookkeeping.",
							"name": "_ab_record_id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "_ab_stream",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "_additional",
							"type": {
								"kind": "OBJECT",
								"name": "CommitsAdditionalGroupHitsAdditional"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "author",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "branch",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "comments_url",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "commit",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "committer",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "created_at",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "html_url",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "node_id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "parents",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "repository",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "sha",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "text",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "url",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalGroupHits"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommits_ab_streamObj"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsMetaObject"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsrepositoryObj"
				},
				{
					"description": "An object used to get %ss on a local Weaviate",
					"fields": [
						{
							"args": [
								{
									"description": "",
									"name": "hybrid",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsHybridInpObj"
									}
								},
								{
									"description": "Show the results after a given ID",
									"name": "after",
									"type": {
										"kind": "SCALAR",
										"name": "String"
									}
								},
								{
									"description": "Limit the results set (usually fewer results mean faster queries)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								},
								{
									"description": "Show the results after the first x results (pagination option)",
									"name": "offset",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								},
								{
									"description": "Filter options for a local Get query, used to convert the result to the specified filters",
									"name": "where",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsWhereInpObj"
									}
								},
								{
									"description": "",
									"name": "groupBy",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsGroupByInpObj"
									}
								},
								{
									"description": "",
									"name": "bm25",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsHybridGetBm25InpObj"
									}
								},
								{
									"description": "",
									"name": "ask",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "QnATransformersGetObjectsCommitsAskInpObj"
									}
								},
								{
									"description": "Cut off number of results after the Nth extrema. Off by default, negative numbers mean off.",
									"name": "autocut",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								},
								{
									"description": "",
									"name": "sort",
									"type": {
										"kind": "LIST",
										"name": null
									}
								},
								{
									"description": "",
									"name": "nearVector",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsNearVectorInpObj"
									}
								},
								{
									"description": "",
									"name": "nearObject",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsNearObjectInpObj"
									}
								},
								{
									"description": "",
									"name": "group",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "GetObjectsCommitsGroupInpObj"
									}
								}
							],
							"description": "",
							"name": "Commits",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "GetObjectsObj"
				},
				{
					"description": "An object containing filter options for a local Get query, used to convert the result to the specified filters",
					"fields": null,
					"inputFields": [
						{
							"description": "",
							"name": "type",
							"type": {
								"kind": "ENUM",
								"name": "GetObjectsCommitsGroupInpObjTypeEnum"
							}
						},
						{
							"description": "The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible",
							"name": "force",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsGroupInpObj"
				},
				{
					"description": "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. ",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "Int"
				},
				{
					"description": "String or String[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "TextDateAggregateObjectsCommits"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The maximum distance from the point specified geoCoordinates.",
							"name": "max",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsWhereGeoRangeDistanceInpObj"
				},
				{
					"description": "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [
								{
									"description": "",
									"name": "includeDeprecated",
									"type": {
										"kind": "SCALAR",
										"name": "Boolean"
									}
								}
							],
							"description": "",
							"name": "enumValues",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [
								{
									"description": "",
									"name": "includeDeprecated",
									"type": {
										"kind": "SCALAR",
										"name": "Boolean"
									}
								}
							],
							"description": "",
							"name": "fields",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "inputFields",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "interfaces",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "kind",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "name",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "ofType",
							"type": {
								"kind": "OBJECT",
								"name": "__Type"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "possibleTypes",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "__Type"
				},
				{
					"description": "An enum describing what kind of type a given `__Type` is",
					"fields": null,
					"inputFields": null,
					"kind": "ENUM",
					"name": "__TypeKind"
				},
				{
					"description": "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "args",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "deprecationReason",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "isDeprecated",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "type",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "__Field"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsnode_idObj"
				},
				{
					"description": "An object containing filter options for a local Get query, used to convert the result to the specified filters",
					"fields": null,
					"inputFields": [
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueString",
							"type": {
								"kind": "SCALAR",
								"name": "TextStringGetObjectsCommits"
							}
						},
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueDate",
							"type": {
								"kind": "SCALAR",
								"name": "TextDateGetObjectsCommits"
							}
						},
						{
							"description": "Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object)",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify a Boolean value that the target property will be compared to",
							"name": "valueBoolean",
							"type": {
								"kind": "SCALAR",
								"name": "BooleanGetObjectsCommits"
							}
						},
						{
							"description": "Contains the Operands that can be applied to a 'where' filter",
							"name": "operands",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point.",
							"name": "valueGeoRange",
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "GetObjectsCommitsWhereGeoRangeInpObj"
							}
						},
						{
							"description": "Contains the Operators that can be applied to a 'where' filter",
							"name": "operator",
							"type": {
								"kind": "ENUM",
								"name": "GetObjectsCommitsWhereOperatorEnum"
							}
						},
						{
							"description": "Specify an Integer value that the target property will be compared to",
							"name": "valueInt",
							"type": {
								"kind": "SCALAR",
								"name": "IntGetObjectsCommits"
							}
						},
						{
							"description": "Specify a Text value that the target property will be compared to",
							"name": "valueText",
							"type": {
								"kind": "SCALAR",
								"name": "TextGetObjectsCommits"
							}
						},
						{
							"description": "Specify a Float value that the target property will be compared to",
							"name": "valueNumber",
							"type": {
								"kind": "SCALAR",
								"name": "FloatGetObjectsCommits"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsWhereInpObj"
				},
				{
					"description": "Specify the property of the class to group by",
					"fields": null,
					"inputFields": [
						{
							"description": "Specify the path from the objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object)",
							"name": "path",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "Specify the number of groups to be created",
							"name": "groups",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "Specify the number of max objects in group",
							"name": "objectsPerGroup",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsGroupByInpObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitstextTopOccurrencesObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsbranchTopOccurrencesObj"
				},
				{
					"description": "An object containing filter options for a local Get query, used to convert the result to the specified filters",
					"fields": null,
					"inputFields": [
						{
							"description": "Question to be answered",
							"name": "question",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "Properties which contains text",
							"name": "properties",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "QnATransformersGetObjectsCommitsAskInpObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommits_ab_record_idObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommits_ab_record_idTopOccurrencesObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsrepositoryTopOccurrencesObj"
				},
				{
					"description": "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "String"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitshtml_urlTopOccurrencesObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitstextObj"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "groupedBy",
							"type": {
								"kind": "OBJECT",
								"name": "CommitsAdditionalGroupGroupedBy"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "hits",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "maxDistance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "minDistance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalGroup"
				},
				{
					"description": "An object allowing Aggregation of %ss on a local Weaviate",
					"fields": [
						{
							"args": [
								{
									"description": "",
									"name": "nearVector",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "AggregateObjectsCommitsNearVectorInpObj"
									}
								},
								{
									"description": "",
									"name": "nearObject",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "AggregateObjectsCommitsNearObjectInpObj"
									}
								},
								{
									"description": "Show the first x results (pagination option)",
									"name": "objectLimit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								},
								{
									"description": "",
									"name": "hybrid",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "AggregateObjectsCommitsHybridInpObj"
									}
								},
								{
									"description": "",
									"name": "ask",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "QnATransformersAggregateCommitsAskInpObj"
									}
								},
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								},
								{
									"description": "Filter options for a local Get query, used to convert the result to the specified filters",
									"name": "where",
									"type": {
										"kind": "INPUT_OBJECT",
										"name": "AggregateObjectsCommitsWhereInpObj"
									}
								},
								{
									"description": "Specify which properties to group by",
									"name": "groupBy",
									"type": {
										"kind": "LIST",
										"name": null
									}
								}
							],
							"description": "",
							"name": "Commits",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateObjectsObj"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "Target vector to be used in kNN search",
							"name": "vector",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"description": "Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).",
							"name": "certainty",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"description": "The required degree of similarity between an object's characteristics and the provided filter values",
							"name": "distance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsNearVectorInpObj"
				},
				{
					"description": "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). ",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "Float"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsshaObj"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "endPosition",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "hasAnswer",
							"type": {
								"kind": "SCALAR",
								"name": "Boolean"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "property",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "result",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "startPosition",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalAnswer"
				},
				{
					"description": "",
					"fields": null,
					"inputFields": [
						{
							"description": "The required degree of similarity between an object's characteristics and the provided filter values",
							"name": "distance",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"description": "Concept identifier in the uuid format",
							"name": "id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "Concept identifier in the beacon format, such as weaviate://<hostname>/<kind>/id",
							"name": "beacon",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).",
							"name": "certainty",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "AggregateObjectsCommitsNearObjectInpObj"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscommitterObj"
				},
				{
					"description": "Float or Float[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "FloatGetObjectsCommits"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsbranchObj"
				},
				{
					"description": "String or String[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "TextStringGetObjectsCommits"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "CommitsAdditionalGroupGroupedBy"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscomments_urlObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitsshaTopOccurrencesObj"
				},
				{
					"description": "Hybrid search",
					"fields": null,
					"inputFields": [
						{
							"description": "Algorithm used for fusing results from vector and keyword search",
							"name": "fusionType",
							"type": {
								"kind": "ENUM",
								"name": "FusionEnum"
							}
						},
						{
							"description": "Query string",
							"name": "query",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"description": "Search weight",
							"name": "alpha",
							"type": {
								"kind": "SCALAR",
								"name": "Float"
							}
						},
						{
							"description": "Vector search",
							"name": "vector",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Which properties should be included in the sparse search",
							"name": "properties",
							"type": {
								"kind": "LIST",
								"name": null
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsHybridInpObj"
				},
				{
					"description": "An object containing the Operands that can be applied to a 'where' filter",
					"fields": null,
					"inputFields": [
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueString",
							"type": {
								"kind": "SCALAR",
								"name": "TextStringGetObjectsCommits"
							}
						},
						{
							"description": "Specify a Text value that the target property will be compared to",
							"name": "valueText",
							"type": {
								"kind": "SCALAR",
								"name": "TextGetObjectsCommits"
							}
						},
						{
							"description": "Specify the path from the Objects fields to the property name (e.g. ['Things', 'City', 'population'] leads to the 'population' property of a 'City' object)",
							"name": "path",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify an Integer value that the target property will be compared to",
							"name": "valueInt",
							"type": {
								"kind": "SCALAR",
								"name": "IntGetObjectsCommits"
							}
						},
						{
							"description": "Contains the Operands that can be applied to a 'where' filter",
							"name": "operands",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"description": "Specify a String value that the target property will be compared to",
							"name": "valueDate",
							"type": {
								"kind": "SCALAR",
								"name": "TextDateGetObjectsCommits"
							}
						},
						{
							"description": "Specify both geo-coordinates (latitude and longitude as decimals) and a maximum distance from the described coordinates. The search will return any result which is located less than or equal to the specified maximum distance in km away from the specified point.",
							"name": "valueGeoRange",
							"type": {
								"kind": "INPUT_OBJECT",
								"name": "GetObjectsCommitsWhereGeoRangeInpObj"
							}
						},
						{
							"description": "Contains the Operators that can be applied to a 'where' filter",
							"name": "operator",
							"type": {
								"kind": "ENUM",
								"name": "GetObjectsCommitsWhereOperatorEnum"
							}
						},
						{
							"description": "Specify a Float value that the target property will be compared to",
							"name": "valueNumber",
							"type": {
								"kind": "SCALAR",
								"name": "FloatGetObjectsCommits"
							}
						},
						{
							"description": "Specify a Boolean value that the target property will be compared to",
							"name": "valueBoolean",
							"type": {
								"kind": "SCALAR",
								"name": "BooleanGetObjectsCommits"
							}
						}
					],
					"kind": "INPUT_OBJECT",
					"name": "GetObjectsCommitsWhereOperandsInpObj"
				},
				{
					"description": "",
					"fields": [
						{
							"args": [],
							"description": "Record ID, used for bookkeeping.",
							"name": "_ab_record_id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "_ab_stream",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "_additional",
							"type": {
								"kind": "OBJECT",
								"name": "CommitsAdditional"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "author",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "branch",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "comments_url",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "commit",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "committer",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "created_at",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "html_url",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "node_id",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "parents",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "repository",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "sha",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "text",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "This property was generated by Weaviate's auto-schema feature on Sun Oct 29 16:27:55 2023",
							"name": "url",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "Commits"
				},
				{
					"description": "String or String[]",
					"fields": null,
					"inputFields": null,
					"kind": "SCALAR",
					"name": "TextAggregateObjectsCommits"
				},
				{
					"description": "An object containing Aggregation information about this property",
					"fields": [
						{
							"args": [],
							"description": "The total amount of found instances for this property",
							"name": "count",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [
								{
									"description": "Show the first x results (pagination option)",
									"name": "limit",
									"type": {
										"kind": "SCALAR",
										"name": "Int"
									}
								}
							],
							"description": "An object containing data about the most frequently occurring values for this property",
							"name": "topOccurrences",
							"type": {
								"kind": "LIST",
								"name": null
							}
						},
						{
							"args": [],
							"description": "Aggregate on the total amount of found property values",
							"name": "type",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitshtml_urlObj"
				},
				{
					"description": "An object containing data about the most frequently occurring values for this property",
					"fields": [
						{
							"args": [],
							"description": "How often the most frequently occurring value for this property occurs",
							"name": "occurs",
							"type": {
								"kind": "SCALAR",
								"name": "Int"
							}
						},
						{
							"args": [],
							"description": "The most frequently occurring value for this property",
							"name": "value",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "AggregateCommitscommitTopOccurrencesObj"
				},
				{
					"description": "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
					"fields": [
						{
							"args": [],
							"description": "",
							"name": "deprecationReason",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "description",
							"type": {
								"kind": "SCALAR",
								"name": "String"
							}
						},
						{
							"args": [],
							"description": "",
							"name": "isDeprecated",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						},
						{
							"args": [],
							"description": "",
							"name": "name",
							"type": {
								"kind": "NON_NULL",
								"name": null
							}
						}
					],
					"inputFields": null,
					"kind": "OBJECT",
					"name": "__EnumValue"
				}
			]
		}
	}
};
let result = graphqlSchemaMinifier(schema);
console.log("Legend:");
console.log(JSON.stringify(result.legend, null, 2));
console.log("Minified:");
console.log(JSON.stringify(result.minified, null, 2));

// log the character length difference
let legendLength = JSON.stringify(result.legend).length;
let minifiedLength = JSON.stringify(result.minified).length;
let originalLength = JSON.stringify(schema).length;
console.log("Legend length: " + legendLength);
console.log("Minified length: " + minifiedLength);
console.log("Original length: " + originalLength);
console.log("Difference: " + (originalLength - minifiedLength + legendLength));
