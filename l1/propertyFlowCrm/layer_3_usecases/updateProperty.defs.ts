/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/updateProperty.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updateProperty",
  "title": "Editar imóvel",
  "purpose": "Atualizar informações de um imóvel e refletir métricas.",
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
      "commandId": "updateProperty",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "title",
          "type": "string",
          "required": false
        },
        {
          "name": "address",
          "type": "string",
          "required": false
        },
        {
          "name": "price",
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
