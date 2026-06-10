/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/createProperty.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "createProperty",
  "title": "Cadastrar imóvel",
  "purpose": "Cadastrar um imóvel no MDM e atualizar métricas.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "propertyAggregate"
  ],
  "outputEntities": [
    "propertyAggregate"
  ],
  "readsTables": [],
  "writesTables": [
    {
      "tableName": "Property",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "property_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "commands": [
    {
      "commandId": "createProperty",
      "input": [
        {
          "name": "title",
          "type": "string",
          "required": true
        },
        {
          "name": "address",
          "type": "string",
          "required": true
        },
        {
          "name": "price",
          "type": "number",
          "required": true
        },
        {
          "name": "status",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "propertyId",
          "type": "string"
        }
      ]
    }
  ],
  "rulesApplied": [
    "rulePropertyStatus",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
