/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/visitListPage.defs.ts" enhancement="_blank"/>

export const visitListPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "visitListPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 60,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "visitListPage",
      "pageName": "Lista de Visitas",
      "actor": "corretorActor",
      "purpose": "Listagem e gerenciamento de visitas agendadas do corretor autenticado. Permite visualizar, filtrar por status e intervalo de datas, atualizar o status de cada visita (confirmar, marcar como realizada, cancelar, reagendar) e navegar para o agendamento de nova visita.",
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
          "name": "statusFilter",
          "type": "VisitStatusEnum",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro opcional de status da visita (agendada, confirmada, realizada, cancelada, reagendada)."
        },
        {
          "name": "dateRangeStart",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data de início do intervalo de filtro."
        },
        {
          "name": "dateRangeEnd",
          "type": "date",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Data de fim do intervalo de filtro."
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "visitFormPage",
          "trigger": "Clique em 'Agendar Visita'",
          "description": "Navega para o formulário de agendamento de nova visita."
        },
        {
          "direction": "inbound",
          "pageId": "operationalDashboardPage",
          "trigger": "Clique em card de visitas",
          "description": "Acesso a partir do Dashboard Operacional via card de visitas."
        }
      ],
      "sections": [
        {
          "sectionName": "Barra de Filtros",
          "mode": "view",
          "organisms": [
            {
              "organismName": "VisitFilterBar",
              "purpose": "Permite ao corretor filtrar a lista de visitas por status e intervalo de datas. Exibe controles de seleção de status e date-picker de período.",
              "userActions": [
                "Selecionar status de filtro",
                "Definir intervalo de datas (dateRangeStart / dateRangeEnd)",
                "Limpar filtros"
              ],
              "requiredEntities": [],
              "readsFields": [
                "statusFilter",
                "dateRangeStart",
                "dateRangeEnd"
              ],
              "writesFields": [
                "statusFilter",
                "dateRangeStart",
                "dateRangeEnd"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Lista de Visitas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "VisitListTable",
              "purpose": "Exibe a lista paginada de visitas do corretor autenticado com colunas de imóvel, lead, data/hora agendada e status atual. Aplica isolamento RBAC garantindo que apenas visitas do corretor autenticado sejam exibidas.",
              "userActions": [
                "Visualizar lista de visitas",
                "Paginar resultados"
              ],
              "requiredEntities": [
                "Visit",
                "Property",
                "Lead"
              ],
              "readsFields": [
                "visitId",
                "propertyId",
                "propertyTitle",
                "leadId",
                "leadName",
                "scheduledAt",
                "status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "VisitStatusActionMenu",
              "purpose": "Menu de ações inline por visita que expõe as transições de status disponíveis (confirmar, marcar como realizada, cancelar, reagendar) de acordo com o status atual da visita. Aciona o BFF de atualização de status.",
              "userActions": [
                "Confirmar visita (agendada → confirmada)",
                "Marcar visita como realizada (confirmada → realizada)",
                "Cancelar visita com motivo (agendada/confirmada/reagendada → cancelada)",
                "Reagendar visita para nova data/hora (agendada/confirmada → reagendada)"
              ],
              "requiredEntities": [
                "Visit",
                "VisitStatusTransitionEvent"
              ],
              "readsFields": [
                "visitId",
                "status",
                "scheduledAt"
              ],
              "writesFields": [
                "status",
                "transitionReason",
                "scheduledAt"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-visit-no-conflict"
              ]
            }
          ]
        },
        {
          "sectionName": "Ação Principal",
          "mode": "view",
          "organisms": [
            {
              "organismName": "ScheduleVisitCTA",
              "purpose": "Botão de ação principal que navega para o formulário de agendamento de nova visita.",
              "userActions": [
                "Clicar em 'Agendar Visita' para navegar ao visitFormPage"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
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
        "commandName": "listVisitsQuery",
        "purpose": "Retorna a lista paginada de visitas do corretor autenticado, aplicando filtros opcionais de status e intervalo de datas. O isolamento RBAC é garantido pelo usecase, que restringe os resultados ao corretorId resolvido pela sessão.",
        "kind": "query",
        "input": [
          {
            "name": "statusFilter",
            "type": "VisitStatusEnum",
            "required": false
          },
          {
            "name": "dateRangeStart",
            "type": "date",
            "required": false
          },
          {
            "name": "dateRangeEnd",
            "type": "date",
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
            "name": "visitId",
            "type": "string"
          },
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "propertyTitle",
            "type": "string"
          },
          {
            "name": "leadId",
            "type": "string"
          },
          {
            "name": "leadName",
            "type": "string"
          },
          {
            "name": "scheduledAt",
            "type": "date"
          },
          {
            "name": "status",
            "type": "VisitStatusEnum"
          },
          {
            "name": "totalCount",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Visit",
          "Property",
          "Lead",
          "Corretor"
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
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "updateVisitStatusCommand",
        "purpose": "Executa a transição de status de uma visita (confirmar, marcar como realizada, cancelar ou reagendar). Valida conflito de horário quando aplicável, registra o VisitStatusTransitionEvent e atualiza a métrica de visitas do mês.",
        "kind": "mutation",
        "input": [
          {
            "name": "visitId",
            "type": "string",
            "required": true
          },
          {
            "name": "fromStatus",
            "type": "VisitStatusEnum",
            "required": true
          },
          {
            "name": "toStatus",
            "type": "VisitStatusEnum",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "required": false
          },
          {
            "name": "newScheduledAt",
            "type": "date",
            "required": false
          }
        ],
        "output": [
          {
            "name": "eventId",
            "type": "string"
          },
          {
            "name": "visitId",
            "type": "string"
          },
          {
            "name": "newStatus",
            "type": "VisitStatusEnum"
          },
          {
            "name": "transitionedAt",
            "type": "date"
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
          "rule-rbac-data-isolation",
          "rule-visit-no-conflict"
        ]
      }
    ]
  }
} as const;

export default visitListPagePagePlan;
