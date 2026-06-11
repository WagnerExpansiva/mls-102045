/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/dealTrackerPage.defs.ts" enhancement="_blank"/>

export const dealTrackerPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "dealTrackerPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "dealTrackerPage",
      "pageName": "Rastreador de Negócios",
      "actor": "corretorActor",
      "purpose": "Visualização e gestão do pipeline de negócios/propostas por etapas (Proposta → Negociação → Contrato → Fechado/Perdido). Permite ao corretor visualizar seus negócios agrupados por etapa, avançar etapas, marcar como perdido e criar novos negócios.",
      "capabilities": [
        "trackDeals",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "dealStageProgression"
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
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "dealFormPage",
          "trigger": "Clique em 'Novo Negócio'",
          "description": "Navega para o formulário de criação de novo negócio/proposta"
        },
        {
          "direction": "outbound",
          "pageId": "dealDetailPage",
          "trigger": "Clique no card do negócio",
          "description": "Navega para o detalhe completo do negócio selecionado"
        },
        {
          "direction": "inbound",
          "pageId": "operationalDashboardPage",
          "trigger": "Clique em card de negócios no dashboard",
          "description": "Entrada a partir do Dashboard Operacional"
        }
      ],
      "sections": [
        {
          "sectionName": "Barra de Ações e Filtros",
          "mode": "read",
          "organisms": [
            {
              "organismName": "DealTrackerToolbar",
              "purpose": "Exibir botão 'Novo Negócio' e controles de filtro (por etapa, período, imóvel, lead) para o pipeline do corretor autenticado.",
              "userActions": [
                "Clicar em 'Novo Negócio' para navegar ao dealFormPage",
                "Aplicar filtros de etapa, período e entidades vinculadas"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Pipeline Kanban por Etapas",
          "mode": "read",
          "organisms": [
            {
              "organismName": "DealKanbanBoard",
              "purpose": "Renderizar colunas Kanban para cada etapa do funil (Proposta, Negociação, Contrato, Fechado, Perdido) com os cards dos negócios do corretor autenticado, exibindo imóvel vinculado, lead vinculado, valor da proposta e etapa atual.",
              "userActions": [
                "Visualizar negócios agrupados por etapa",
                "Clicar no card do negócio para navegar ao dealDetailPage"
              ],
              "requiredEntities": [
                "Deal",
                "DealStageTransitionEvent"
              ],
              "readsFields": [
                "Deal.dealId",
                "Deal.stage",
                "Deal.proposedValue",
                "Deal.dealType",
                "Deal.createdAt",
                "Deal.updatedAt",
                "Deal.propertyId",
                "Deal.leadId",
                "Deal.corretorId"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-deal-stage-transition"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações Inline de Etapa",
          "mode": "write",
          "organisms": [
            {
              "organismName": "DealStageAdvanceAction",
              "purpose": "Permitir ao corretor avançar a etapa do negócio diretamente no card Kanban, respeitando as transições válidas definidas pelo lifecycle dealStageProgression.",
              "userActions": [
                "Avançar etapa do negócio (proposta → negociação → contrato → fechado)",
                "Confirmar avanço de etapa com observação opcional"
              ],
              "requiredEntities": [
                "Deal",
                "DealStageTransitionEvent"
              ],
              "readsFields": [
                "Deal.dealId",
                "Deal.stage",
                "Deal.corretorId"
              ],
              "writesFields": [
                "Deal.stage",
                "Deal.updatedAt",
                "DealStageTransitionEvent.fromStage",
                "DealStageTransitionEvent.toStage",
                "DealStageTransitionEvent.performedBy",
                "DealStageTransitionEvent.occurredAt",
                "DealStageTransitionEvent.notes"
              ],
              "rulesApplied": [
                "rule-deal-stage-transition",
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "DealMarkLostAction",
              "purpose": "Permitir ao corretor marcar um negócio como perdido a partir de qualquer etapa ativa, exigindo preenchimento do motivo de perda.",
              "userActions": [
                "Marcar negócio como perdido",
                "Informar motivo de perda (lostReason) obrigatório",
                "Confirmar encerramento do negócio"
              ],
              "requiredEntities": [
                "Deal",
                "DealStageTransitionEvent"
              ],
              "readsFields": [
                "Deal.dealId",
                "Deal.stage",
                "Deal.corretorId"
              ],
              "writesFields": [
                "Deal.stage",
                "Deal.lostReason",
                "Deal.updatedAt",
                "DealStageTransitionEvent.fromStage",
                "DealStageTransitionEvent.toStage",
                "DealStageTransitionEvent.performedBy",
                "DealStageTransitionEvent.occurredAt",
                "DealStageTransitionEvent.details"
              ],
              "rulesApplied": [
                "rule-deal-stage-transition",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listDealsByStage",
        "purpose": "Buscar todos os negócios do corretor autenticado agrupados por etapa do funil, aplicando isolamento RBAC e filtros opcionais, para renderizar o Kanban do Rastreador de Negócios.",
        "kind": "query",
        "input": [
          {
            "name": "stageFilter",
            "type": "DealStageEnum",
            "required": false
          },
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
          }
        ],
        "output": [
          {
            "name": "stage",
            "type": "DealStageEnum"
          },
          {
            "name": "deals",
            "type": "Deal[]"
          },
          {
            "name": "totalByStage",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Deal",
          "DealStageTransitionEvent"
        ],
        "writesEntities": [],
        "readsTables": [
          "deal_stage_transition_event_log"
        ],
        "writesTables": [],
        "usecaseRefs": [
          "advanceDealStageUsecase"
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
        "commandName": "advanceDealStage",
        "purpose": "Avançar ou regredir a etapa de um negócio respeitando as transições válidas do lifecycle dealStageProgression, registrando o evento de transição e atualizando métricas de pipeline.",
        "kind": "mutation",
        "input": [
          {
            "name": "dealId",
            "type": "string",
            "required": true
          },
          {
            "name": "fromStage",
            "type": "DealStageEnum",
            "required": true
          },
          {
            "name": "toStage",
            "type": "DealStageEnum",
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
            "name": "eventId",
            "type": "string"
          },
          {
            "name": "dealId",
            "type": "string"
          },
          {
            "name": "newStage",
            "type": "DealStageEnum"
          },
          {
            "name": "transitionedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Deal"
        ],
        "writesEntities": [
          "Deal",
          "DealStageTransitionEvent"
        ],
        "readsTables": [
          "deal_stage_transition_event_log"
        ],
        "writesTables": [
          "deal_stage_transition_event_log"
        ],
        "usecaseRefs": [
          "advanceDealStageUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-deal-stage-transition",
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "markDealLost",
        "purpose": "Marcar um negócio como perdido a partir de qualquer etapa ativa, exigindo motivo de perda, registrando o evento de transição e sincronizando status do imóvel e lead vinculados.",
        "kind": "mutation",
        "input": [
          {
            "name": "dealId",
            "type": "string",
            "required": true
          },
          {
            "name": "lostReason",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "eventId",
            "type": "string"
          },
          {
            "name": "dealId",
            "type": "string"
          },
          {
            "name": "newStage",
            "type": "DealStageEnum"
          },
          {
            "name": "transitionedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Deal"
        ],
        "writesEntities": [
          "Deal",
          "DealStageTransitionEvent"
        ],
        "readsTables": [
          "deal_stage_transition_event_log"
        ],
        "writesTables": [
          "deal_stage_transition_event_log"
        ],
        "usecaseRefs": [
          "advanceDealStageUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-deal-stage-transition",
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default dealTrackerPagePagePlan;
