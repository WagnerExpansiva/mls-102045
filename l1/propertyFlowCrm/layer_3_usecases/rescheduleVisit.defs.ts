/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/rescheduleVisit.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "rescheduleVisit",
  "title": "Reagendar visita",
  "purpose": "Reagendar visita existente e atualizar métricas.",
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
      "commandId": "rescheduleVisit",
      "input": [
        {
          "name": "visitId",
          "type": "string",
          "required": true
        },
        {
          "name": "scheduledAt",
          "type": "date",
          "required": true
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
