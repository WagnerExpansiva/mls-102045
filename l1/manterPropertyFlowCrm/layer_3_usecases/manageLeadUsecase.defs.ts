/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/manageLeadUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "manageLeadUsecase",
  "title": "Gerenciar Lead / Cliente (CRUD)",
  "purpose": "Cria e edita leads/clientes, aplicando isolamento de dados por perfil. Atualiza a métrica de leads do mês ao criar um novo lead.",
  "actor": "corretorActor",
  "layer": "layer_3_usecases",
  "inputEntities": [],
  "outputEntities": [],
  "readsTables": [
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "corretor",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "monthly_leads_metric",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "createLead",
      "input": [
        {
          "name": "name",
          "type": "string",
          "required": true
        },
        {
          "name": "email",
          "type": "string",
          "required": false
        },
        {
          "name": "phone",
          "type": "string",
          "required": false
        },
        {
          "name": "source",
          "type": "string",
          "required": false
        },
        {
          "name": "corretorId",
          "type": "string",
          "required": true
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "leadId",
          "type": "string"
        },
        {
          "name": "stage",
          "type": "LeadStageEnum"
        },
        {
          "name": "createdAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "editLead",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        },
        {
          "name": "name",
          "type": "string",
          "required": false
        },
        {
          "name": "email",
          "type": "string",
          "required": false
        },
        {
          "name": "phone",
          "type": "string",
          "required": false
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "leadId",
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
