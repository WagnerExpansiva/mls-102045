/// <mls fileReference="_102045_/l4/workflows/leadFollowUp.defs.ts" enhancement="_blank"/>

export const leadFollowUpDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "leadFollowUp",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 25,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "leadFollowUp",
      "title": "Follow-up Automatizado de Lead",
      "purpose": "Sugerir ações de follow-up baseadas em IA e criar tarefas para o corretor manter o engajamento do lead ao longo do tempo.",
      "executionMode": "automation",
      "createsTask": true,
      "taskConfig": {
        "taskTitleTemplate": "Follow-up: {leadFullName} - {suggestedAction}",
        "assigneeRules": [
          "Atribuir ao corretor responsável pelo lead (assignedBrokerId)",
          "Se corretor indisponível, escalar para gerente da equipe"
        ],
        "slaRules": [
          "Tarefa deve ser concluída em até 24h após criação",
          "Alerta de atraso após 12h sem ação",
          "Escalar para gerente após 48h sem conclusão"
        ],
        "taskRoomRequired": false
      },
      "actors": [
        "broker"
      ],
      "states": [
        {
          "stateId": "idle",
          "description": "Estado inicial - aguardando gatilho de tempo ou evento para avaliar necessidade de follow-up"
        },
        {
          "stateId": "evaluating",
          "description": "Sistema avaliando histórico de interações e calculando se follow-up é necessário"
        },
        {
          "stateId": "suggestionGenerated",
          "description": "Sugestão de follow-up gerada pela IA e armazenada no lead"
        },
        {
          "stateId": "taskCreated",
          "description": "Tarefa de follow-up criada e atribuída ao corretor responsável"
        },
        {
          "stateId": "followUpExecuted",
          "description": "Corretor executou o follow-up e registrou a interação"
        },
        {
          "stateId": "dismissed",
          "description": "Corretor descartou a sugestão de follow-up (lead não requer contato)"
        }
      ],
      "transitions": [
        {
          "from": "idle",
          "to": "evaluating",
          "trigger": "scheduledCheck",
          "actor": "system",
          "conditions": [
            "Lead está em status active",
            "Lead não está em pipelineStage converted ou lost",
            "Passou tempo mínimo desde última interação (configurável, padrão 48h)"
          ],
          "actions": [
            "Buscar última interação do lead via listLeadInteractions",
            "Calcular tempo desde lastContactAt"
          ],
          "rulesApplied": []
        },
        {
          "from": "evaluating",
          "to": "suggestionGenerated",
          "trigger": "followUpNeeded",
          "actor": "system",
          "conditions": [
            "Tempo desde última interação excede threshold configurado",
            "Lead não possui nextFollowUpAt no futuro",
            "Lead tem temperatura morna ou quente (temperature != cold)"
          ],
          "actions": [
            "Gerar sugestão de mensagem via IA baseada no histórico de interações",
            "Atualizar Lead.suggestedFollowUpMessage com texto gerado",
            "Atualizar Lead.nextFollowUpAt com data sugerida"
          ],
          "rulesApplied": [
            "ruleLeadPipelineTransition"
          ]
        },
        {
          "from": "evaluating",
          "to": "idle",
          "trigger": "noFollowUpNeeded",
          "actor": "system",
          "conditions": [
            "Lead já possui interação recente dentro do threshold",
            "Lead está frio (temperature = cold) e não requer follow-up automático",
            "Lead já possui nextFollowUpAt agendado no futuro"
          ],
          "actions": [
            "Registrar log de avaliação sem ação necessária"
          ],
          "rulesApplied": []
        },
        {
          "from": "suggestionGenerated",
          "to": "taskCreated",
          "trigger": "createFollowUpTask",
          "actor": "system",
          "conditions": [
            "Sugestão de follow-up foi gerada com sucesso",
            "Não existe tarefa de follow-up pendente para este lead"
          ],
          "actions": [
            "Criar tarefa de follow-up atribuída ao assignedBrokerId",
            "Incluir suggestedFollowUpMessage na descrição da tarefa",
            "Definir prazo da tarefa baseado em nextFollowUpAt"
          ],
          "rulesApplied": []
        },
        {
          "from": "taskCreated",
          "to": "followUpExecuted",
          "trigger": "interactionRegistered",
          "actor": "broker",
          "conditions": [
            "Corretor registrou nova interação via registerInteraction",
            "Interação é do tipo outbound (direction = saída)"
          ],
          "actions": [
            "Atualizar Lead.lastContactAt com data da interação",
            "Limpar Lead.suggestedFollowUpMessage",
            "Limpar Lead.nextFollowUpAt",
            "Marcar tarefa como concluída",
            "Registrar evento em crmActivityMetrics"
          ],
          "rulesApplied": [
            "ruleInteractionRequiredFields"
          ]
        },
        {
          "from": "taskCreated",
          "to": "dismissed",
          "trigger": "dismissSuggestion",
          "actor": "broker",
          "conditions": [
            "Corretor optou por não realizar follow-up",
            "Motivo de descarte informado"
          ],
          "actions": [
            "Limpar Lead.suggestedFollowUpMessage",
            "Atualizar Lead.nextFollowUpAt para data futura (adiar follow-up)",
            "Marcar tarefa como cancelada com motivo",
            "Registrar evento de descarte em crmActivityMetrics"
          ],
          "rulesApplied": []
        },
        {
          "from": "followUpExecuted",
          "to": "idle",
          "trigger": "resetCycle",
          "actor": "system",
          "conditions": [
            "Follow-up foi executado com sucesso"
          ],
          "actions": [
            "Reiniciar ciclo de monitoramento para próxima avaliação"
          ],
          "rulesApplied": []
        },
        {
          "from": "dismissed",
          "to": "idle",
          "trigger": "resetCycle",
          "actor": "system",
          "conditions": [
            "Sugestão foi descartada"
          ],
          "actions": [
            "Reiniciar ciclo de monitoramento respeitando novo nextFollowUpAt"
          ],
          "rulesApplied": []
        }
      ],
      "requiredEntities": [
        "Lead",
        "LeadInteraction"
      ],
      "persistenceRefs": [
        "leadInteractionTable",
        "leadMetrics",
        "crmActivityMetrics"
      ],
      "usecaseRefs": [
        "registerInteraction",
        "listLeadInteractions"
      ],
      "metricRefs": [
        "leadMetrics",
        "crmActivityMetrics"
      ],
      "userActions": [
        "Visualizar sugestão de follow-up no card do lead",
        "Executar follow-up e registrar interação",
        "Descartar sugestão de follow-up com motivo",
        "Adiar follow-up para data futura",
        "Visualizar histórico de interações do lead"
      ],
      "relatedPages": [
        "brokerDashboard",
        "interactionForm",
        "leadDetail",
        "leadDetailPage",
        "leadPipelinePage"
      ],
      "relatedAgents": [
        "followUpSuggestionAgent"
      ],
      "relatedPlugins": [],
      "rulesApplied": [
        "ruleLeadPipelineTransition",
        "ruleInteractionRequiredFields"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "suggestFollowUpAfterNoResponse",
          "title": "Gerar sugestão de follow-up 48h após interação sem resposta do lead",
          "priority": "soon",
          "description": "Implementar job agendado que verifica leads sem interação há mais de 48h e gera sugestões de follow-up usando IA. O job deve considerar a temperatura do lead e o estágio do pipeline para personalizar a mensagem sugerida.",
          "tradeoff": "Requer infraestrutura de jobs agendados e integração com serviço de IA. Pode gerar muitas tarefas se threshold for muito baixo."
        },
        {
          "suggestionId": "aiMessagePersonalization",
          "title": "Personalizar mensagem de follow-up com contexto do lead",
          "priority": "soon",
          "description": "A IA deve considerar: histórico de interações, preferências de imóvel, orçamento, bairros de interesse e temperatura do lead para gerar mensagens contextualizadas e relevantes.",
          "tradeoff": "Maior consumo de tokens de IA e latência na geração. Mensagens mais relevantes aumentam taxa de resposta."
        },
        {
          "suggestionId": "configurableThresholds",
          "title": "Permitir configuração de thresholds por corretor ou equipe",
          "priority": "later",
          "description": "Diferentes corretores podem ter estratégias distintas de follow-up. Permitir configuração de tempo mínimo entre follow-ups e critérios de temperatura.",
          "tradeoff": "Aumenta complexidade de configuração. Beneficia equipes com processos de vendas distintos."
        },
        {
          "suggestionId": "taskIntegrationWithCalendar",
          "title": "Integrar tarefas de follow-up com calendário do corretor",
          "priority": "later",
          "description": "Sincronizar tarefas de follow-up com Google Calendar ou Outlook para melhor gestão de tempo do corretor.",
          "tradeoff": "Requer integração com APIs externas e autenticação OAuth. Melhora adoção e cumprimento de SLAs."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "propertyFlowCrm"
      ],
      "pageRefsByModule": [
        {
          "moduleId": "propertyFlowCrm",
          "pageId": "leadPipelinePage"
        },
        {
          "moduleId": "propertyFlowCrm",
          "pageId": "leadDetailPage"
        }
      ],
      "entityRefsByModule": [
        {
          "moduleId": "propertyFlowCrm",
          "entity": "Lead"
        },
        {
          "moduleId": "propertyFlowCrm",
          "entity": "LeadInteraction"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "table",
          "artifactId": "leadInteractionTable"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "metricTable",
          "artifactId": "crmActivityMetrics"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "metricTable",
          "artifactId": "leadMetrics"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "registerInteraction"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/leadFollowUp.defs.ts",
      "exportName": "leadFollowUpDef",
      "saveAsDefs": true
    }
  }
} as const;

export default leadFollowUpDef;
