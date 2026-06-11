/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/leadPipelinePage.defs.ts" enhancement="_blank"/>

export const leadPipelinePagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "leadPipelinePage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 59,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "leadPipelinePage",
      "pageName": "Pipeline de Leads (Kanban)",
      "actor": "corretorActor",
      "purpose": "Visualização e gestão do funil de leads em formato Kanban por etapas. Permite mover leads entre etapas via drag-and-drop, classificar leads com IA (Quente/Morno/Frio) e obter sugestões de follow-up personalizadas.",
      "capabilities": [
        "leadPipelineKanban",
        "manageLeads",
        "aiLeadClassification",
        "aiFollowUpSuggestion",
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
        "i18n",
        "provedor"
      ],
      "mdmRefs": [
        "lead",
        "broker"
      ],
      "pageInputs": [],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "leadDetailPage",
          "trigger": "Clique no card do lead",
          "description": "Abre o detalhe completo do lead selecionado"
        },
        {
          "direction": "outbound",
          "pageId": "leadFormPage",
          "trigger": "Clique em 'Novo Lead'",
          "description": "Abre o formulário de criação de novo lead"
        },
        {
          "direction": "inbound",
          "pageId": "operationalDashboardPage",
          "trigger": "Clique em card de leads no dashboard",
          "description": "Navega do Dashboard Operacional para o Pipeline de Leads"
        }
      ],
      "sections": [
        {
          "sectionName": "Barra de Ferramentas do Pipeline",
          "mode": "view",
          "organisms": [
            {
              "organismName": "PipelineToolbar",
              "purpose": "Exibe filtros de busca, botão de criação de novo lead e contador de leads por etapa. Permite ao corretor filtrar o Kanban por nome, temperatura ou etapa.",
              "userActions": [
                "Filtrar leads por nome/telefone",
                "Filtrar por temperatura (Quente/Morno/Frio)",
                "Clicar em 'Novo Lead' para navegar ao formulário"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "lead.name",
                "lead.temperature",
                "lead.stage"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Kanban de Etapas do Funil",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadKanbanBoard",
              "purpose": "Renderiza as colunas do funil (Novo, Contato, Visita, Proposta, Fechado, Perdido) com os cards de leads agrupados por etapa. Suporta drag-and-drop para mover leads entre colunas.",
              "userActions": [
                "Visualizar leads agrupados por etapa do funil",
                "Arrastar card de lead para nova coluna (drag-and-drop)",
                "Confirmar transição de etapa no modal de confirmação",
                "Informar motivo opcional da transição",
                "Clicar no card para abrir detalhe do lead"
              ],
              "requiredEntities": [
                "Lead",
                "LeadStageTransitionEvent"
              ],
              "readsFields": [
                "lead.leadId",
                "lead.name",
                "lead.phone",
                "lead.email",
                "lead.stage",
                "lead.temperature",
                "lead.temperatureJustification",
                "lead.updatedAt",
                "lead.assignedCorretorId"
              ],
              "writesFields": [
                "lead.stage"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-lead-stage-transition"
              ]
            },
            {
              "organismName": "LeadKanbanCard",
              "purpose": "Card individual do lead exibido em cada coluna do Kanban. Mostra nome, temperatura (badge colorido), telefone e ações rápidas de IA (classificar, sugerir follow-up).",
              "userActions": [
                "Clicar no card para abrir detalhe do lead",
                "Acionar classificação de IA no card",
                "Acionar sugestão de follow-up no card"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "lead.leadId",
                "lead.name",
                "lead.phone",
                "lead.temperature",
                "lead.temperatureJustification",
                "lead.stage"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-llm-agent-invocation"
              ]
            }
          ]
        },
        {
          "sectionName": "Modal de Classificação de Lead com IA",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "AiClassificationModal",
              "purpose": "Modal acionado pelo corretor para invocar o agente LLM de classificação do lead. Exibe o resultado (Quente/Morno/Frio) com justificativa para revisão antes de persistir.",
              "userActions": [
                "Acionar classificação de IA para o lead selecionado",
                "Revisar resultado de classificação e justificativa",
                "Confirmar persistência da classificação no lead",
                "Cancelar sem persistir"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "lead.leadId",
                "lead.name",
                "lead.temperature"
              ],
              "writesFields": [
                "lead.temperature",
                "lead.temperatureJustification"
              ],
              "rulesApplied": [
                "rule-llm-agent-invocation",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Modal de Sugestão de Follow-up com IA",
          "mode": "view",
          "organisms": [
            {
              "organismName": "FollowUpSuggestionModal",
              "purpose": "Modal acionado pelo corretor para obter sugestão de mensagem de follow-up personalizada via agente LLM. Exibe a mensagem sugerida para revisão e cópia.",
              "userActions": [
                "Acionar sugestão de follow-up para o lead selecionado",
                "Visualizar mensagem sugerida pelo agente LLM",
                "Copiar mensagem sugerida para área de transferência",
                "Fechar modal sem persistir"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "lead.leadId",
                "lead.name",
                "lead.stage",
                "lead.temperature"
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
        "commandName": "getLeadsByStage",
        "purpose": "Buscar todos os leads do corretor autenticado agrupados por etapa do funil para renderizar o Kanban. Aplica isolamento RBAC por corretorId resolvido via sessão.",
        "kind": "query",
        "input": [
          {
            "name": "filters",
            "type": "string",
            "required": false
          },
          {
            "name": "temperature",
            "type": "LeadTemperatureEnum",
            "required": false
          },
          {
            "name": "stage",
            "type": "LeadStageEnum",
            "required": false
          }
        ],
        "output": [
          {
            "name": "stage",
            "type": "LeadStageEnum"
          },
          {
            "name": "leads",
            "type": "Lead[]"
          },
          {
            "name": "count",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Lead",
          "Corretor"
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
        "commandName": "moveLeadStage",
        "purpose": "Mover lead para nova etapa do funil respeitando as transições válidas definidas em rule-lead-stage-transition. Registra evento de transição e atualiza métricas.",
        "kind": "mutation",
        "input": [
          {
            "name": "leadId",
            "type": "string",
            "required": true
          },
          {
            "name": "fromStage",
            "type": "LeadStageEnum",
            "required": true
          },
          {
            "name": "toStage",
            "type": "LeadStageEnum",
            "required": true
          },
          {
            "name": "reason",
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
            "name": "leadId",
            "type": "string"
          },
          {
            "name": "newStage",
            "type": "LeadStageEnum"
          },
          {
            "name": "transitionedAt",
            "type": "datetime"
          }
        ],
        "readsEntities": [
          "Lead"
        ],
        "writesEntities": [
          "Lead",
          "LeadStageTransitionEvent"
        ],
        "readsTables": [
          "lead_stage_transition_event_log"
        ],
        "writesTables": [
          "lead_stage_transition_event_log"
        ],
        "usecaseRefs": [
          "moveLeadStageUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-lead-stage-transition",
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "classifyLeadAi",
        "purpose": "Invocar agente LLM para classificar o lead como Quente/Morno/Frio com base em anotações e histórico. Retorna resultado para revisão do corretor antes de persistir.",
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
        "purpose": "Invocar agente LLM para sugerir mensagem de follow-up personalizada com base no perfil, classificação e histórico do lead. Resultado retornado para revisão do corretor.",
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

export default leadPipelinePagePagePlan;
