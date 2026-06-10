/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/updateLeadNotes.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updateLeadNotes",
  "title": "Registrar anotações do lead",
  "purpose": "Registrar anotações no lead.",
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
      "commandId": "updateLeadNotes",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        },
        {
          "name": "notes",
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
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
