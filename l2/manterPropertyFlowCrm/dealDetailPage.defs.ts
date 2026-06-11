/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/dealDetailPage.defs.ts" enhancement="_blank"/>

export const dealDetailPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "dealDetailPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 57,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "dealDetailPage",
      "pageName": "Detalhe do Negócio",
      "actor": "corretorActor",
      "purpose": "Visualização completa do negócio: imóvel e lead vinculados, histórico de etapas, valor da proposta e ações de progressão ou encerramento.",
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
      "pageInputs": [
        {
          "name": "dealId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam"
          ],
          "description": "Identificador único do negócio a ser exibido.",
          "entityRef": "Deal",
          "fieldRef": "dealId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "dealTrackerPage",
          "trigger": "Clique no card do negócio"
        },
        {
          "direction": "outbound",
          "pageId": "propertyListPage",
          "trigger": "Clique no imóvel vinculado",
          "description": "Navega para a lista de imóveis ao clicar no imóvel vinculado ao negócio"
        },
        {
          "direction": "outbound",
          "pageId": "leadDetailPage",
          "trigger": "Clique no lead vinculado",
          "description": "Navega para o detalhe do lead ao clicar no lead vinculado ao negócio"
        }
      ],
      "sections": [
        {
          "sectionName": "Cabeçalho do Negócio",
          "mode": "read",
          "organisms": [
            {
              "organismName": "DealHeaderCard",
              "purpose": "Exibir informações principais do negócio: etapa atual, valor da proposta, tipo de negócio, datas de criação e atualização, e corretor responsável.",
              "userActions": [],
              "requiredEntities": [
                "Deal",
                "Corretor"
              ],
              "readsFields": [
                "Deal.dealId",
                "Deal.stage",
                "Deal.proposedValue",
                "Deal.dealType",
                "Deal.createdAt",
                "Deal.updatedAt",
                "Deal.closedAt",
                "Corretor.name"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Imóvel e Lead Vinculados",
          "mode": "read",
          "organisms": [
            {
              "organismName": "LinkedPropertyCard",
              "purpose": "Exibir resumo do imóvel vinculado ao negócio com link de navegação para a lista de imóveis.",
              "userActions": [
                "Clique no imóvel vinculado"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.propertyId",
                "Property.title",
                "Property.address",
                "Property.status",
                "Property.price",
                "Property.type"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "LinkedLeadCard",
              "purpose": "Exibir resumo do lead vinculado ao negócio com link de navegação para o detalhe do lead.",
              "userActions": [
                "Clique no lead vinculado"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "Lead.leadId",
                "Lead.name",
                "Lead.email",
                "Lead.phone",
                "Lead.stage"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Histórico de Etapas",
          "mode": "read",
          "organisms": [
            {
              "organismName": "DealStageHistoryTimeline",
              "purpose": "Exibir linha do tempo cronológica de todas as transições de etapa do negócio, incluindo etapa de origem, destino, responsável, data/hora e observações.",
              "userActions": [],
              "requiredEntities": [
                "DealStageTransitionEvent"
              ],
              "readsFields": [
                "DealStageTransitionEvent.eventId",
                "DealStageTransitionEvent.fromStage",
                "DealStageTransitionEvent.toStage",
                "DealStageTransitionEvent.performedBy",
                "DealStageTransitionEvent.occurredAt",
                "DealStageTransitionEvent.notes"
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
          "sectionName": "Ações de Progressão",
          "mode": "write",
          "organisms": [
            {
              "organismName": "AdvanceDealStagePanel",
              "purpose": "Permitir ao corretor avançar a etapa do negócio para a próxima etapa válida conforme as regras de transição. Exibe apenas a ação disponível para a etapa atual e bloqueia ações em estados terminais.",
              "userActions": [
                "Avançar etapa"
              ],
              "requiredEntities": [
                "Deal"
              ],
              "readsFields": [
                "Deal.stage",
                "Deal.dealId"
              ],
              "writesFields": [
                "Deal.stage",
                "Deal.updatedAt"
              ],
              "rulesApplied": [
                "rule-deal-stage-transition",
                "rule-rbac-data-isolation"
              ]
            },
            {
              "organismName": "MarkDealLostPanel",
              "purpose": "Permitir ao corretor marcar o negócio como perdido informando obrigatoriamente o motivo. Disponível em qualquer etapa ativa (proposta, negociação, contrato). Bloqueado em estados terminais.",
              "userActions": [
                "Marcar como perdido"
              ],
              "requiredEntities": [
                "Deal"
              ],
              "readsFields": [
                "Deal.stage",
                "Deal.dealId"
              ],
              "writesFields": [
                "Deal.stage",
                "Deal.lostReason",
                "Deal.updatedAt"
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
        "commandName": "getDealDetails",
        "purpose": "Buscar detalhes completos do negócio incluindo dados do deal, imóvel vinculado, lead vinculado e histórico cronológico de transições de etapa.",
        "kind": "query",
        "input": [
          {
            "name": "dealId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "dealId",
            "type": "string"
          },
          {
            "name": "stage",
            "type": "DealStageEnum"
          },
          {
            "name": "proposedValue",
            "type": "number"
          },
          {
            "name": "dealType",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "date"
          },
          {
            "name": "updatedAt",
            "type": "date"
          },
          {
            "name": "closedAt",
            "type": "date"
          },
          {
            "name": "lostReason",
            "type": "string"
          },
          {
            "name": "corretorId",
            "type": "string"
          },
          {
            "name": "corretorName",
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
            "name": "propertyAddress",
            "type": "string"
          },
          {
            "name": "propertyStatus",
            "type": "string"
          },
          {
            "name": "propertyPrice",
            "type": "number"
          },
          {
            "name": "propertyType",
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
            "name": "leadEmail",
            "type": "string"
          },
          {
            "name": "leadPhone",
            "type": "string"
          },
          {
            "name": "leadStage",
            "type": "string"
          },
          {
            "name": "stageHistory",
            "type": "DealStageTransitionEvent[]"
          }
        ],
        "readsEntities": [
          "Deal",
          "DealStageTransitionEvent",
          "Property",
          "Lead",
          "Corretor"
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
        "purpose": "Avançar a etapa do negócio para a próxima etapa válida conforme as regras de transição, registrando o evento de transição e atualizando métricas de pipeline.",
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
        "purpose": "Marcar o negócio como perdido informando o motivo obrigatório, registrando o evento de transição, sincronizando o status do imóvel para disponível e o lead para perdido.",
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
          "DealStageTransitionEvent",
          "Property",
          "Lead"
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

export default dealDetailPagePagePlan;
