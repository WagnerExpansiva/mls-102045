/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/archiveProperty.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "archiveProperty",
  "title": "Inativar imóvel",
  "purpose": "Inativar imóvel no MDM e atualizar métricas.",
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
      "commandId": "archiveProperty",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "reason",
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
