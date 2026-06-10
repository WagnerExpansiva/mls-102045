/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/getLead.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getLead",
  "title": "Carregar lead",
  "purpose": "Carregar detalhes de um lead para a página de detalhe.",
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
      "commandId": "getLead",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "lead",
          "type": "Lead"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
