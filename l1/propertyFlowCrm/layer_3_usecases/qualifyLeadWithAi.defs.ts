/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/qualifyLeadWithAi.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "qualifyLeadWithAi",
  "title": "Classificar lead com IA",
  "purpose": "Classificar lead e sugerir follow-up usando IA.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "leadAggregate"
  ],
  "outputEntities": [
    "leadAggregate"
  ],
  "readsTables": [
    {
      "tableName": "Lead",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "Lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "commands": [
    {
      "commandId": "qualifyLeadWithAi",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "temperature",
          "type": "string"
        },
        {
          "name": "nextAction",
          "type": "string"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleLeadTemperature",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
