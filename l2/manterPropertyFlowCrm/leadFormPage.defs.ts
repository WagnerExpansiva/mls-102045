/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/leadFormPage.defs.ts" enhancement="_blank"/>

export const leadFormPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "leadFormPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "leadFormPage",
      "pageName": "Formulário de Lead",
      "actor": "corretorActor",
      "purpose": "Criação e edição de lead/cliente com dados de contato, preferências e imóveis de interesse. Suporta modo criação (sem leadId) e modo edição (com leadId via rota).",
      "capabilities": [
        "manageLeads",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "leadStageTransition"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "i18n"
      ],
      "mdmRefs": [
        "lead",
        "broker"
      ],
      "pageInputs": [
        {
          "name": "leadId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam"
          ],
          "description": "Identificador do lead a ser editado. Ausente no modo criação.",
          "entityRef": "Lead",
          "fieldRef": "leadId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "leadPipelinePage",
          "trigger": "Clique em 'Novo Lead'"
        },
        {
          "direction": "inbound",
          "pageId": "leadDetailPage",
          "trigger": "Clique em 'Editar'"
        },
        {
          "direction": "outbound",
          "pageId": "leadPipelinePage",
          "trigger": "Salvar ou cancelar"
        }
      ],
      "sections": [
        {
          "sectionName": "Cabeçalho do Formulário",
          "mode": "read",
          "organisms": [
            {
              "organismName": "FormHeaderOrganism",
              "purpose": "Exibe o título dinâmico da página ('Novo Lead' ou 'Editar Lead') e o botão de cancelar para retornar ao pipeline.",
              "userActions": [
                "Cancelar e retornar ao pipeline"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "name"
              ],
              "writesFields": [],
              "rulesApplied": []
            }
          ]
        },
        {
          "sectionName": "Dados de Contato",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadContactFormOrganism",
              "purpose": "Formulário com os campos de identificação e contato do lead: nome, e-mail, telefone e origem. Em modo edição, pré-carrega os dados existentes via getLeadByIdQuery.",
              "userActions": [
                "Preencher nome do lead",
                "Preencher e-mail",
                "Preencher telefone",
                "Selecionar origem do lead"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "name",
                "email",
                "phone",
                "source"
              ],
              "writesFields": [
                "name",
                "email",
                "phone",
                "source"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Preferências e Anotações",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadPreferencesFormOrganism",
              "purpose": "Campos de preferências do lead (tipo de imóvel, faixa de valor, localização desejada) e campo de anotações livres para o corretor.",
              "userActions": [
                "Preencher preferências de imóvel",
                "Adicionar anotações"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "notes"
              ],
              "writesFields": [
                "notes"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações do Formulário",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadFormActionsOrganism",
              "purpose": "Botões de ação primária: 'Salvar Lead' (dispara createLeadCommand ou updateLeadCommand conforme o modo) e 'Cancelar'. Exibe feedback de validação e estado de carregamento.",
              "userActions": [
                "Salvar lead (criar ou atualizar)",
                "Cancelar e retornar ao pipeline"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId"
              ],
              "writesFields": [
                "name",
                "email",
                "phone",
                "source",
                "notes"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getLeadByIdQuery",
        "purpose": "Busca os dados completos de um lead existente para pré-popular o formulário no modo edição. Aplica isolamento de dados garantindo que o corretor só acesse leads atribuídos a ele.",
        "kind": "query",
        "input": [
          {
            "name": "leadId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "leadId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "phone",
            "type": "string"
          },
          {
            "name": "source",
            "type": "string"
          },
          {
            "name": "notes",
            "type": "string"
          },
          {
            "name": "stage",
            "type": "LeadStageEnum"
          },
          {
            "name": "createdAt",
            "type": "date"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Lead"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "manageLeadUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "createLeadCommand",
        "purpose": "Cadastra um novo lead no sistema associado ao corretor autenticado. Atualiza a métrica mensal de leads após a criação.",
        "kind": "mutation",
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
        ],
        "readsEntities": [
          "Lead",
          "Corretor"
        ],
        "writesEntities": [
          "Lead"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "manageLeadUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "updateLeadCommand",
        "purpose": "Atualiza os dados de contato, preferências e anotações de um lead existente. Aplica isolamento de dados garantindo que o corretor só edite leads atribuídos a ele.",
        "kind": "mutation",
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
            "name": "source",
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
        ],
        "readsEntities": [
          "Lead",
          "Corretor"
        ],
        "writesEntities": [
          "Lead"
        ],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "manageLeadUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default leadFormPagePagePlan;
