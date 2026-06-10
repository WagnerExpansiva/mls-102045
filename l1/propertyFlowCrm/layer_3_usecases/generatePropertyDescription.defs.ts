/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/generatePropertyDescription.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "generatePropertyDescription",
  "title": "Gerar descrição com IA",
  "purpose": "Gerar descrição de imóvel a partir dos dados existentes.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "propertyAggregate"
  ],
  "outputEntities": [
    "propertyAggregate"
  ],
  "readsTables": [
    {
      "tableName": "Property",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "commands": [
    {
      "commandId": "generatePropertyDescription",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "tone",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "description",
          "type": "string"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
