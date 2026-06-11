/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/visitFormPage.defs.ts" enhancement="_blank"/>

export const visitFormPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "visitFormPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 57,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "visitFormPage",
      "pageName": "Formulário de Visita",
      "actor": "corretorActor",
      "purpose": "Agendamento de nova visita vinculando imóvel, lead e corretor com data/hora. Valida conflito de horário antes de confirmar.",
      "capabilities": [
        "scheduleVisits",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "visitLifecycle"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "i18n"
      ],
      "mdmRefs": [
        "property",
        "lead",
        "broker"
      ],
      "pageInputs": [
        {
          "name": "leadId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "ID do lead pré-selecionado quando a página é aberta a partir do detalhe do lead.",
          "entityRef": "Lead",
          "fieldRef": "leadId"
        },
        {
          "name": "propertyId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "ID do imóvel pré-selecionado quando a página é aberta a partir do detalhe do imóvel.",
          "entityRef": "Property",
          "fieldRef": "propertyId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "visitListPage",
          "trigger": "Clique em 'Agendar Visita' na lista de visitas"
        },
        {
          "direction": "inbound",
          "pageId": "leadDetailPage",
          "trigger": "Clique em 'Agendar Visita' no detalhe do lead"
        },
        {
          "direction": "outbound",
          "pageId": "visitListPage",
          "trigger": "Salvar agendamento com sucesso ou cancelar formulário"
        }
      ],
      "sections": [
        {
          "sectionName": "Seleção de Imóvel",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "PropertySelectorOrganism",
              "purpose": "Permitir ao corretor buscar e selecionar o imóvel que será visitado. Pré-popula com propertyId quando fornecido via pageInput.",
              "userActions": [
                "Buscar imóvel por nome/endereço",
                "Selecionar imóvel da lista"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "propertyId",
                "title",
                "address",
                "type",
                "status"
              ],
              "writesFields": [
                "propertyId"
              ],
              "rulesApplied": [
                "rule-visit-requires-property-lead-corretor",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Seleção de Lead",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadSelectorOrganism",
              "purpose": "Permitir ao corretor buscar e selecionar o lead que realizará a visita. Pré-popula com leadId quando fornecido via pageInput.",
              "userActions": [
                "Buscar lead por nome/contato",
                "Selecionar lead da lista"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "name",
                "email",
                "phone",
                "stage"
              ],
              "writesFields": [
                "leadId"
              ],
              "rulesApplied": [
                "rule-visit-requires-property-lead-corretor",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Dados do Agendamento",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "VisitScheduleFormOrganism",
              "purpose": "Capturar data/hora da visita e observações opcionais. Exibe aviso de conflito de horário em tempo real antes de confirmar.",
              "userActions": [
                "Definir data e hora da visita",
                "Adicionar observações opcionais",
                "Verificar disponibilidade de horário"
              ],
              "requiredEntities": [
                "Visit"
              ],
              "readsFields": [
                "scheduledAt",
                "notes"
              ],
              "writesFields": [
                "scheduledAt",
                "notes"
              ],
              "rulesApplied": [
                "rule-visit-no-conflict"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação do Agendamento",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "VisitScheduleConfirmOrganism",
              "purpose": "Resumo dos dados selecionados (imóvel, lead, corretor, data/hora) e botão de confirmação do agendamento. Exibe erros de validação de conflito ou vínculos ausentes.",
              "userActions": [
                "Confirmar agendamento",
                "Cancelar e voltar para lista de visitas"
              ],
              "requiredEntities": [
                "Visit",
                "Property",
                "Lead",
                "Corretor"
              ],
              "readsFields": [
                "propertyId",
                "leadId",
                "corretorId",
                "scheduledAt",
                "notes"
              ],
              "writesFields": [
                "visitId",
                "status"
              ],
              "rulesApplied": [
                "rule-visit-requires-property-lead-corretor",
                "rule-visit-no-conflict",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listPropertiesForSelector",
        "purpose": "Buscar lista paginada de imóveis ativos para o seletor de imóvel no formulário de visita, filtrando por termo de busca.",
        "kind": "query",
        "input": [
          {
            "name": "searchTerm",
            "type": "string",
            "required": false
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
          }
        ],
        "output": [
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "address",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "totalCount",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Property"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "updateVisitStatusUsecase"
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
        "commandName": "listLeadsForSelector",
        "purpose": "Buscar lista paginada de leads do corretor autenticado para o seletor de lead no formulário de visita, filtrando por termo de busca.",
        "kind": "query",
        "input": [
          {
            "name": "searchTerm",
            "type": "string",
            "required": false
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
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
            "name": "stage",
            "type": "string"
          },
          {
            "name": "totalCount",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Lead"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "updateVisitStatusUsecase"
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
        "commandName": "checkVisitConflict",
        "purpose": "Verificar em tempo real se existe conflito de horário para o corretor autenticado na data/hora informada, antes de confirmar o agendamento.",
        "kind": "query",
        "input": [
          {
            "name": "scheduledAt",
            "type": "date",
            "required": true
          }
        ],
        "output": [
          {
            "name": "hasConflict",
            "type": "boolean"
          },
          {
            "name": "conflictingVisitId",
            "type": "string"
          },
          {
            "name": "conflictingScheduledAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Visit"
        ],
        "writesEntities": [],
        "readsTables": [
          "visit_status_transition_event_log"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "updateVisitStatusUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-visit-no-conflict",
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "scheduleVisit",
        "purpose": "Criar agendamento de nova visita validando vínculos obrigatórios (imóvel, lead, corretor) e ausência de conflito de horário. Registra evento de transição de status e atualiza métrica de visitas.",
        "kind": "mutation",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "leadId",
            "type": "string",
            "required": true
          },
          {
            "name": "corretorId",
            "type": "string",
            "required": true
          },
          {
            "name": "scheduledAt",
            "type": "date",
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
            "name": "visitId",
            "type": "string"
          },
          {
            "name": "status",
            "type": "VisitStatusEnum"
          },
          {
            "name": "scheduledAt",
            "type": "date"
          },
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "leadId",
            "type": "string"
          },
          {
            "name": "corretorId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "Visit",
          "Property",
          "Lead",
          "Corretor"
        ],
        "writesEntities": [
          "Visit",
          "VisitStatusTransitionEvent"
        ],
        "readsTables": [
          "visit_status_transition_event_log"
        ],
        "writesTables": [
          "visit_status_transition_event_log"
        ],
        "usecaseRefs": [
          "updateVisitStatusUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-visit-requires-property-lead-corretor",
          "rule-visit-no-conflict",
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default visitFormPagePagePlan;
