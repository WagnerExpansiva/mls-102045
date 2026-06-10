/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/createLead.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "createLead",
  "title": "Cadastrar lead",
  "purpose": "Cadastrar lead no MDM e atualizar métricas.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "leadAggregate"
  ],
  "outputEntities": [
    "leadAggregate"
  ],
  "readsTables": [],
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
      "commandId": "createLead",
      "input": [
        {
          "name": "name",
          "type": "string",
          "required": true
        },
        {
          "name": "email",
          "type": "string",
          "required": false
        },
        {
          "name": "phone",
          "type": "string",
          "required": false
        },
        {
          "name": "temperature",
          "type": "string",
          "required": false
        },
        {
          "name": "stage",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "leadId",
          "type": "string"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleLeadTemperature",
    "ruleLeadStageTransition",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
