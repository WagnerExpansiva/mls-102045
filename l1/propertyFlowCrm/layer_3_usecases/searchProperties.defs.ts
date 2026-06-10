/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/searchProperties.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "searchProperties",
  "title": "Buscar imóveis",
  "purpose": "Consultar imóveis por filtros para o corretor.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "propertyAggregate"
  ],
  "outputEntities": [
    "propertyAggregate"
  ],
  "readsTables": [
    {
      "tableName": "Property",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "commands": [
    {
      "commandId": "searchProperties",
      "input": [
        {
          "name": "query",
          "type": "string",
          "required": false
        },
        {
          "name": "minPrice",
          "type": "number",
          "required": false
        },
        {
          "name": "maxPrice",
          "type": "number",
          "required": false
        },
        {
          "name": "status",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "properties",
          "type": "Property[]"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
