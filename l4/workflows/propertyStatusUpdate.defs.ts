/// <mls fileReference="_102045_/l4/workflows/propertyStatusUpdate.defs.ts" enhancement="_blank"/>

export const propertyStatusUpdateDef = {
  "schemaVersion": "2026-06-06",
  "artifactType": "workflow",
  "artifactId": "propertyStatusUpdate",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanWorkflowDefinition",
    "stepId": 25,
    "planId": "plan-validate-solution-coverage"
  },
  "data": {
    "workflowDefinition": {
      "workflowId": "propertyStatusUpdate",
      "title": "Atualização de Status do Imóvel",
      "purpose": "Controlar as transições de status de um imóvel no estoque (disponível, reservado, vendido, alugado, inativo), garantindo consistência com negócios em andamento e registrando mudanças para auditoria via PropertyStatusTransitionEvent.",
      "executionMode": "entityLifecycle",
      "createsTask": false,
      "taskConfig": {
        "taskTitleTemplate": "",
        "assigneeRules": [],
        "slaRules": [],
        "taskRoomRequired": false
      },
      "actors": [
        "adminActor"
      ],
      "states": [
        {
          "stateId": "disponivel",
          "description": "Imóvel disponível no estoque, sem negócio ativo vinculado. Estado inicial padrão após cadastro ou cancelamento de negócio."
        },
        {
          "stateId": "reservado",
          "description": "Imóvel reservado para um negócio em andamento. Transição disparada automaticamente ao criar um Deal ou manualmente pelo Admin."
        },
        {
          "stateId": "vendido",
          "description": "Imóvel vendido. Transição disparada ao fechar um negócio de venda (dealClosed) ou manualmente pelo Admin."
        },
        {
          "stateId": "alugado",
          "description": "Imóvel alugado. Transição disparada ao fechar um negócio de locação (dealClosed) ou manualmente pelo Admin."
        },
        {
          "stateId": "inativo",
          "description": "Imóvel retirado do estoque ativo. Pode ser marcado manualmente pelo Admin quando o imóvel não está mais disponível para comercialização."
        }
      ],
      "transitions": [
        {
          "from": "disponivel",
          "to": "reservado",
          "trigger": "dealCreated",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'disponivel'",
            "Um negócio (Deal) foi criado vinculado ao imóvel",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'reservado'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='dealCreated', fromStatus='disponivel', toStatus='reservado'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "reservado",
          "to": "vendido",
          "trigger": "dealClosed",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'reservado'",
            "Negócio vinculado foi fechado como venda (dealClosed)",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'vendido'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='dealClosed', fromStatus='reservado', toStatus='vendido'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "reservado",
          "to": "alugado",
          "trigger": "dealClosed",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'reservado'",
            "Negócio vinculado foi fechado como locação (dealClosed)",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'alugado'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='dealClosed', fromStatus='reservado', toStatus='alugado'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "reservado",
          "to": "disponivel",
          "trigger": "dealLost",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'reservado'",
            "Negócio vinculado foi cancelado ou perdido (dealLost)",
            "Não há outro negócio ativo vinculado ao imóvel",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'disponivel'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='dealLost', fromStatus='reservado', toStatus='disponivel'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "disponivel",
          "to": "inativo",
          "trigger": "manualStatusChange",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'disponivel'",
            "Admin solicita inativação manual do imóvel",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'inativo'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='manual', fromStatus='disponivel', toStatus='inativo'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "inativo",
          "to": "disponivel",
          "trigger": "manualStatusChange",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'inativo'",
            "Admin solicita reativação manual do imóvel",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'disponivel'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='manual', fromStatus='inativo', toStatus='disponivel'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "vendido",
          "to": "disponivel",
          "trigger": "manualStatusChange",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'vendido'",
            "Admin solicita reversão manual (ex: negócio desfeito)",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'disponivel'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='manual', fromStatus='vendido', toStatus='disponivel'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        },
        {
          "from": "alugado",
          "to": "disponivel",
          "trigger": "manualStatusChange",
          "actor": "adminActor",
          "conditions": [
            "Imóvel está no status 'alugado'",
            "Admin solicita reversão manual (ex: contrato de locação encerrado)",
            "Actor possui permissão adminActor (rule-rbac-data-isolation)"
          ],
          "actions": [
            "Atualizar Property.status para 'disponivel'",
            "Criar PropertyStatusTransitionEvent com triggeredBy='manual', fromStatus='alugado', toStatus='disponivel'",
            "Invocar updatePropertyStatusUsecase para persistir evento em propertyStatusTransitionEventLog",
            "Atualizar activePropertiesMetric via layer_3_usecases"
          ],
          "rulesApplied": [
            "rule-property-status-transition",
            "rule-rbac-data-isolation"
          ]
        }
      ],
      "requiredEntities": [
        "Property",
        "PropertyStatusTransitionEvent"
      ],
      "persistenceRefs": [
        "propertyStatusTransitionEventLog",
        "activePropertiesMetric"
      ],
      "usecaseRefs": [
        "updatePropertyStatusUsecase"
      ],
      "metricRefs": [
        "activePropertiesMetric"
      ],
      "userActions": [
        "Admin altera manualmente o status de um imóvel via interface",
        "Sistema dispara transição automática ao criar um Deal (disponivel → reservado)",
        "Sistema dispara transição automática ao fechar um Deal (reservado → vendido/alugado)",
        "Sistema dispara transição automática ao perder/cancelar um Deal (reservado → disponivel)",
        "Admin inativa um imóvel manualmente (disponivel → inativo)",
        "Admin reativa um imóvel manualmente (inativo → disponivel)"
      ],
      "relatedPages": [
        "propertyFormPage",
        "propertyListPage"
      ],
      "relatedAgents": [],
      "relatedPlugins": [],
      "rulesApplied": [
        "rule-property-status-transition",
        "rule-rbac-data-isolation"
      ],
      "implementationSuggestions": [
        {
          "suggestionId": "statusTransitionValidation",
          "title": "Validar Transições de Status no Usecase",
          "priority": "now",
          "description": "Implementar guard no updatePropertyStatusUsecase que rejeita transições não permitidas pela rule-property-status-transition antes de persistir qualquer mudança. Retornar erro descritivo ao BFF para exibição na UI.",
          "tradeoff": "Adiciona uma verificação extra no backend, mas garante consistência mesmo em chamadas diretas à API sem passar pela UI."
        },
        {
          "suggestionId": "activePropertiesMetricUpdate",
          "title": "Atualizar Métrica de Imóveis Ativos a Cada Transição",
          "priority": "now",
          "description": "Sempre que updatePropertyStatusUsecase executar uma transição, inserir um novo registro em activePropertiesMetric (TimescaleDB) com o novo status, property_id, corretor_id e timestamp. Isso alimenta o Dashboard Operacional em tempo real.",
          "tradeoff": "Gera um registro por transição na tabela de métricas; com volume alto de imóveis, a política de compressão (30 dias) do hypertable mitiga o crescimento de storage."
        },
        {
          "suggestionId": "checkActiveDeals",
          "title": "Verificar Negócios Ativos antes de Venda/Aluguel",
          "priority": "soon",
          "description": "Antes de confirmar a transição para 'vendido' ou 'alugado', o usecase deve consultar se há Deals ativos vinculados ao imóvel. Se houver mais de um Deal ativo, alertar o Admin ou bloquear a transição até que os demais sejam resolvidos.",
          "tradeoff": "Requer leitura adicional na tabela de Deals (MDM) dentro do usecase. Aumenta a segurança do fluxo, mas adiciona latência marginal na operação."
        },
        {
          "suggestionId": "notifyInterestedLeads",
          "title": "Notificar Leads Interessados via Módulo Horizontal de Notificações",
          "priority": "later",
          "description": "Após uma transição de status relevante (ex: disponivel → reservado, reservado → disponivel), disparar notificação via módulo horizontal de Notificações para corretores com leads interessados no imóvel.",
          "tradeoff": "Depende da implementação do módulo horizontal de Notificações e do relacionamento Lead ↔ Property. Deve ser implementado como evento assíncrono para não bloquear a transição principal."
        },
        {
          "suggestionId": "noTaskCreated",
          "title": "Workflow sem Criação de Task",
          "priority": "never",
          "description": "Este workflow opera como entityLifecycle puro: as transições de status são disparadas automaticamente por eventos de Deal ou manualmente pelo Admin via UI. Não há necessidade de criar Tasks/tarefas humanas, pois o fluxo é imediato e não requer aprovação ou acompanhamento assíncrono.",
          "tradeoff": "Se no futuro for necessário um fluxo de aprovação para transições críticas (ex: marcar como vendido), createsTask pode ser habilitado com assigneeRules para o adminActor."
        }
      ],
      "workflowScope": "singleModule",
      "moduleRefs": [
        "propertyFlowCrm"
      ],
      "pageRefsByModule": [],
      "entityRefsByModule": [
        {
          "moduleId": "propertyFlowCrm",
          "entity": "Property"
        },
        {
          "moduleId": "propertyFlowCrm",
          "entity": "PropertyStatusTransitionEvent"
        }
      ],
      "writesArtifacts": [
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "table",
          "artifactId": "propertyStatusTransitionEventLog"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "metricTable",
          "artifactId": "activePropertiesMetric"
        },
        {
          "moduleId": "propertyFlowCrm",
          "artifactType": "usecase",
          "artifactId": "updatePropertyStatusUsecase"
        }
      ]
    },
    "defsPlan": {
      "fileName": "workflows/propertyStatusUpdate.defs.ts",
      "exportName": "propertyStatusUpdateDef",
      "saveAsDefs": true
    }
  }
} as const;

export default propertyStatusUpdateDef;
