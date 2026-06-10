/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/cancelVisit.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "cancelVisit",
  "title": "Cancelar visita",
  "purpose": "Cancelar visita e atualizar métricas.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "visitAggregate"
  ],
  "outputEntities": [
    "visitAggregate"
  ],
  "readsTables": [
    {
      "tableName": "Visit",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "Visit",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "visit_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "commands": [
    {
      "commandId": "cancelVisit",
      "input": [
        {
          "name": "visitId",
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
          "name": "visitId",
          "type": "string"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleVisitRequiresLinks",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
