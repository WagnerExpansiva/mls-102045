/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/updateLeadStage.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updateLeadStage",
  "title": "Mover lead no kanban",
  "purpose": "Atualizar estágio do lead e refletir métricas.",
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
      "commandId": "updateLeadStage",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
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
    "ruleLeadStageTransition",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
