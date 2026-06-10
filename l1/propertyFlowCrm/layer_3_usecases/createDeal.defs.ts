/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/createDeal.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "createDeal",
  "title": "Criar proposta/negócio",
  "purpose": "Criar negócio vinculado a imóvel e atualizar métricas.",
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
      "tableName": "Property",
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
      "commandId": "createDeal",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "leadId",
          "type": "string",
          "required": false
        },
        {
          "name": "stage",
          "type": "string",
          "required": true
        },
        {
          "name": "value",
          "type": "number",
          "required": false
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
    "ruleDealRequiresProperty",
    "ruleDealStageTransition",
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
