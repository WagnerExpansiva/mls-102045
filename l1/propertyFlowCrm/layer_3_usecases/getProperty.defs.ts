/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/getProperty.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getProperty",
  "title": "Carregar imóvel",
  "purpose": "Carregar dados de um imóvel específico para edição e visualização.",
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
      "commandId": "getProperty",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "property",
          "type": "Property"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
