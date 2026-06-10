/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/listDeals.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listDeals",
  "title": "Listar negócios",
  "purpose": "Listar negócios por etapa para o pipeline de propostas.",
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
  "writesTables": [],
  "commands": [
    {
      "commandId": "listDeals",
      "input": [
        {
          "name": "stage",
          "type": "string",
          "required": false
        },
        {
          "name": "propertyId",
          "type": "string",
          "required": false
        },
        {
          "name": "leadId",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "deals",
          "type": "Deal[]"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
