/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/scheduleVisit.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "scheduleVisit",
  "title": "Agendar visita",
  "purpose": "Agendar visita vinculada a imóvel e lead e atualizar métricas.",
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
    },
    {
      "tableName": "Property",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "Lead",
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
      "commandId": "scheduleVisit",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "leadId",
          "type": "string",
          "required": true
        },
        {
          "name": "scheduledAt",
          "type": "date",
          "required": true
        },
        {
          "name": "notes",
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
