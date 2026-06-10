/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/listLeads.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listLeads",
  "title": "Listar leads",
  "purpose": "Listar leads para o pipeline e filtros do corretor.",
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
  "writesTables": [],
  "commands": [
    {
      "commandId": "listLeads",
      "input": [
        {
          "name": "stage",
          "type": "string",
          "required": false
        },
        {
          "name": "temperature",
          "type": "string",
          "required": false
        },
        {
          "name": "query",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "leads",
          "type": "Lead[]"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
