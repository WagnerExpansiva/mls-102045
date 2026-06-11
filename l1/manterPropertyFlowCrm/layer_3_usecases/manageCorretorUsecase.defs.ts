/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/manageCorretorUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "manageCorretorUsecase",
  "title": "Gerenciar Corretores (Admin)",
  "purpose": "Permite ao Admin criar, editar e ativar/inativar corretores na plataforma, aplicando RBAC.",
  "actor": "adminActor",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [],
  "readsTables": [
    {
      "tableName": "corretor",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "corretor",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "createCorretor",
      "input": [
        {
          "name": "name",
          "type": "string",
          "required": true
        },
        {
          "name": "email",
          "type": "string",
          "required": true
        },
        {
          "name": "phone",
          "type": "string",
          "required": false
        },
        {
          "name": "creci",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "corretorId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "CorretorStatusEnum"
        },
        {
          "name": "createdAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "editCorretor",
      "input": [
        {
          "name": "corretorId",
          "type": "string",
          "required": true
        },
        {
          "name": "name",
          "type": "string",
          "required": false
        },
        {
          "name": "phone",
          "type": "string",
          "required": false
        },
        {
          "name": "status",
          "type": "CorretorStatusEnum",
          "required": false
        }
      ],
      "output": [
        {
          "name": "corretorId",
          "type": "string"
        },
        {
          "name": "updatedAt",
          "type": "date"
        }
      ]
    }
  ]
} as const;

export default useCase;
