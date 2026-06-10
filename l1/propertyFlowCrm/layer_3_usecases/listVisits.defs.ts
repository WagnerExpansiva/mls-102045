/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/listVisits.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "listVisits",
  "title": "Listar visitas",
  "purpose": "Listar visitas para o agendador do corretor.",
  "actor": "corretor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "visitAggregate"
  ],
  "outputEntities": [
    "visitAggregate"
  ],
  "readsTables": [
    {
      "tableName": "Visit",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [],
  "commands": [
    {
      "commandId": "listVisits",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": false
        },
        {
          "name": "leadId",
          "type": "string",
          "required": false
        },
        {
          "name": "fromDate",
          "type": "date",
          "required": false
        },
        {
          "name": "toDate",
          "type": "date",
          "required": false
        },
        {
          "name": "status",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "visits",
          "type": "Visit[]"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
