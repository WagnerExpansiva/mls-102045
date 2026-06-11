/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/leadDetailPage.defs.ts" enhancement="_blank"/>

export const leadDetailPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "leadDetailPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 56,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "leadDetailPage",
      "pageName": "Detalhe do Lead",
      "actor": "corretorActor",
      "purpose": "Visualização completa do perfil do lead: dados de contato, histórico de etapas, visitas agendadas, negócios vinculados, classificação de IA e sugestões de follow-up.",
      "capabilities": [
        "manageLeads",
        "leadPipelineKanban",
        "aiLeadClassification",
        "aiFollowUpSuggestion",
        "scheduleVisits",
        "trackDeals",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "leadStageTransition",
          "visitLifecycle",
          "dealStageProgression"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "i18n",
        "provedor"
      ],
      "mdmRefs": [
        "lead",
        "property",
        "broker"
      ],
      "pageInputs": [
        {
          "name": "leadId",
          "type": "string",
          "required": true,
          "sources": [
            "routeParam"
          ],
          "description": "Identificador único do lead cujo detalhe será exibido.",
          "entityRef": "Lead",
          "fieldRef": "leadId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "leadPipelinePage",
          "trigger": "Clique no card do lead"
        },
        {
          "direction": "outbound",
          "pageId": "leadFormPage",
          "trigger": "Clique em 'Editar'",
          "description": "Navega para o formulário de edição do lead atual"
        },
        {
          "direction": "outbound",
          "pageId": "visitFormPage",
          "trigger": "Clique em 'Agendar Visita'",
          "description": "Navega para o formulário de agendamento de visita pré-vinculado ao lead"
        },
        {
          "direction": "outbound",
          "pageId": "dealFormPage",
          "trigger": "Clique em 'Criar Negócio'",
          "description": "Navega para o formulário de criação de negócio pré-vinculado ao lead"
        }
      ],
      "sections": [
        {
          "sectionName": "Cabeçalho do Lead",
          "mode": "view",
          "organisms": [
            {
              "organismName": "LeadProfileHeader",
              "purpose": "Exibe os dados principais do lead (nome, contato, etapa atual, temperatura/classificação de IA, corretor responsável) e os botões de ação primária (Editar, Agendar Visita, Criar Negócio).",
              "userActions": [
                "Visualizar dados de contato do lead",
                "Visualizar etapa atual e classificação de temperatura",
                "Clicar em 'Editar' para navegar ao formulário de edição",
                "Clicar em 'Agendar Visita' para navegar ao formulário de visita",
                "Clicar em 'Criar Negócio' para navegar ao formulário de negócio"
              ],
              "requiredEntities": [
                "Lead",
                "Corretor"
              ],
              "readsFields": [
                "Lead.leadId",
                "Lead.name",
                "Lead.email",
                "Lead.phone",
                "Lead.source",
                "Lead.stage",
                "Lead.temperature",
                "Lead.temperatureJustification",
                "Lead.notes",
                "Lead.assignedCorretorId",
                "Lead.createdAt",
                "Lead.updatedAt",
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
          "sectionName": "Histórico de Etapas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "LeadStageHistoryTimeline",
              "purpose": "Exibe a linha do tempo cronológica de todas as transições de etapa do lead, com data/hora, etapa de origem, etapa de destino e usuário responsável.",
              "userActions": [
                "Visualizar histórico completo de transições de etapa do lead"
              ],
              "requiredEntities": [
                "LeadStageTransitionEvent"
              ],
              "readsFields": [
                "LeadStageTransitionEvent.eventId",
                "LeadStageTransitionEvent.fromStage",
                "LeadStageTransitionEvent.toStage",
                "LeadStageTransitionEvent.performedBy",
                "LeadStageTransitionEvent.occurredAt",
                "LeadStageTransitionEvent.transitionReason"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-lead-stage-transition"
              ]
            }
          ]
        },
        {
          "sectionName": "Visitas Vinculadas",
          "mode": "view",
          "organisms": [
            {
              "organismName": "LeadVisitsList",
              "purpose": "Lista as visitas agendadas e realizadas vinculadas ao lead, exibindo imóvel, data/hora e status de cada visita.",
              "userActions": [
                "Visualizar visitas vinculadas ao lead",
                "Clicar em 'Agendar Visita' para criar nova visita para este lead"
              ],
              "requiredEntities": [
                "Visit",
                "Property"
              ],
              "readsFields": [
                "Visit.visitId",
                "Visit.scheduledAt",
                "Visit.status",
                "Visit.propertyId",
                "Property.title",
                "Property.address"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Negócios Vinculados",
          "mode": "view",
          "organisms": [
            {
              "organismName": "LeadDealsList",
              "purpose": "Lista os negócios/propostas vinculados ao lead, exibindo imóvel, etapa do negócio, valor e data de criação.",
              "userActions": [
                "Visualizar negócios vinculados ao lead",
                "Clicar em 'Criar Negócio' para criar novo negócio para este lead"
              ],
              "requiredEntities": [
                "Deal",
                "Property"
              ],
              "readsFields": [
                "Deal.dealId",
                "Deal.stage",
                "Deal.dealValue",
                "Deal.dealType",
                "Deal.propertyId",
                "Deal.createdAt",
                "Property.title"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Classificação de IA",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadAiClassificationPanel",
              "purpose": "Exibe a classificação de temperatura atual do lead (Quente/Morno/Frio) com justificativa gerada pela IA, e permite ao corretor acionar nova classificação via agente LLM. O resultado é exibido para revisão antes de ser persistido.",
              "userActions": [
                "Visualizar classificação de temperatura atual e justificativa",
                "Acionar 'Classificar com IA' para invocar o agente LLM",
                "Revisar resultado gerado pela IA antes de confirmar persistência"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "Lead.temperature",
                "Lead.temperatureJustification",
                "Lead.stage"
              ],
              "writesFields": [
                "Lead.temperature",
                "Lead.temperatureJustification"
              ],
              "rulesApplied": [
                "rule-llm-agent-invocation",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Sugestão de Follow-up",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadFollowUpSuggestionPanel",
              "purpose": "Permite ao corretor solicitar ao agente LLM uma sugestão de mensagem de follow-up personalizada com base no perfil, classificação e histórico do lead. A mensagem sugerida é exibida para revisão e pode ser copiada ou descartada.",
              "userActions": [
                "Acionar 'Obter Sugestão de Follow-up' para invocar o agente LLM",
                "Visualizar mensagem sugerida pelo agente",
                "Copiar mensagem sugerida para uso externo"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "Lead.name",
                "Lead.stage",
                "Lead.temperature",
                "Lead.notes"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-llm-agent-invocation",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getLeadDetail",
        "purpose": "Buscar perfil completo do lead com dados de contato, etapa atual, classificação de temperatura, histórico de transições de etapa, visitas vinculadas e negócios vinculados.",
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
            "name": "stage",
            "type": "LeadStageEnum"
          },
          {
            "name": "temperature",
            "type": "LeadTemperatureEnum"
          },
          {
            "name": "temperatureJustification",
            "type": "string"
          },
          {
            "name": "notes",
            "type": "string"
          },
          {
            "name": "assignedCorretorId",
            "type": "string"
          },
          {
            "name": "assignedCorretorName",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "datetime"
          },
          {
            "name": "updatedAt",
            "type": "datetime"
          },
          {
            "name": "stageHistory",
            "type": "LeadStageTransitionEvent[]"
          },
          {
            "name": "visits",
            "type": "Visit[]"
          },
          {
            "name": "deals",
            "type": "Deal[]"
          }
        ],
        "readsEntities": [
          "Lead",
          "Corretor",
          "Visit",
          "Property",
          "Deal"
        ],
        "writesEntities": [],
        "readsTables": [
          "lead_stage_transition_event_log"
        ],
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
        "commandName": "classifyLeadAi",
        "purpose": "Invocar o agente LLM para classificar o lead como Quente/Morno/Frio com base no histórico e anotações. Registra o comando no log de IA e persiste a classificação no lead após revisão do corretor.",
        "kind": "command",
        "input": [
          {
            "name": "leadId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "commandLogId",
            "type": "string"
          },
          {
            "name": "classification",
            "type": "LeadTemperatureEnum"
          },
          {
            "name": "justification",
            "type": "string"
          },
          {
            "name": "classifiedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Lead"
        ],
        "writesEntities": [
          "Lead"
        ],
        "readsTables": [
          "lead_stage_transition_event_log"
        ],
        "writesTables": [
          "ai_command_log"
        ],
        "usecaseRefs": [
          "classifyLeadAiUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-llm-agent-invocation",
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "getFollowUpSuggestion",
        "purpose": "Invocar o agente LLM para sugerir uma mensagem personalizada de follow-up com base no perfil, classificação e histórico do lead. Registra o comando no log de IA e retorna a mensagem sugerida para revisão do corretor.",
        "kind": "command",
        "input": [
          {
            "name": "leadId",
            "type": "string",
            "required": true
          },
          {
            "name": "channel",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "commandLogId",
            "type": "string"
          },
          {
            "name": "suggestedMessage",
            "type": "string"
          },
          {
            "name": "generatedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Lead"
        ],
        "writesEntities": [],
        "readsTables": [
          "lead_stage_transition_event_log"
        ],
        "writesTables": [
          "ai_command_log"
        ],
        "usecaseRefs": [
          "getFollowUpSuggestionUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-llm-agent-invocation",
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default leadDetailPagePagePlan;
