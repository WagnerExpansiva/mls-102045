/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/updateDealStage.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updateDealStage",
  "title": "Atualizar etapa do negócio",
  "purpose": "Atualizar etapa do negócio e refletir métricas.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "dealAggregate"
  ],
  "outputEntities": [
    "dealAggregate"
  ],
  "readsTables": [
    {
      "tableName": "Deal",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "Deal",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "deal_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "commands": [
    {
      "commandId": "updateDealStage",
      "input": [
        {
          "name": "dealId",
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
          "name": "dealId",
          "type": "string"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleDealStageTransition",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
