/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/dealStageTransitionEventLog.defs.ts" enhancement="_blank"/>

export const dealStageTransitionEventLogTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "dealStageTransitionEventLog",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 43,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "dealStageTransitionEventLog",
      "tableName": "deal_stage_transition_event_log",
      "title": "Log de Transições de Etapa do Negócio",
      "moduleId": "propertyFlowCrm",
      "ownership": "moduleOwned",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "purpose": "Registra cada avanço ou regressão de etapa de um negócio/proposta, mantendo histórico auditável das progressões e perdas para análise de pipeline e conformidade com regras de transição.",
      "rootEntity": "DealStageTransitionEvent",
      "primaryKey": [
        "event_id"
      ],
      "columns": [
        {
          "name": "event_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do evento de transição (UUID). Chave primária imutável."
        },
        {
          "name": "deal_id",
          "type": "uuid",
          "nullable": false,
          "description": "ID do negócio (Deal) que sofreu a transição. Referência ao MDM de Negócio/Proposta."
        },
        {
          "name": "from_stage",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Etapa de origem da transição (ex: proposta, negociacao, contrato)."
        },
        {
          "name": "to_stage",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Etapa de destino da transição (ex: negociacao, contrato, fechado, perdido)."
        },
        {
          "name": "performed_by",
          "type": "uuid",
          "nullable": false,
          "description": "ID do usuário (UserAccount) que realizou a transição. Suporta isolamento RBAC e auditoria."
        },
        {
          "name": "occurred_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora exata da transição. Usado para ordenação cronológica e filtros de período no Dashboard Operacional."
        },
        {
          "name": "details",
          "type": "jsonb",
          "nullable": true,
          "description": "Contexto complementar da transição: motivo de perda (lostReason), valor proposto (dealValue), observações (notes) e outros dados de apoio não usados em filtros frequentes."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "DealStageTransitionEventDetails",
        "reason": "Campos como lostReason, dealValue e notes são contextuais, não são usados em filtros, joins ou lifecycle. Armazenados como JSONB para flexibilidade e extensibilidade sem migrações de schema."
      },
      "foreignRefs": [
        {
          "fieldName": "deal_id",
          "targetEntity": "Deal",
          "targetOwnership": "mdmOwned",
          "reason": "Cada evento pertence a um negócio gerenciado pelo MDM de Negócio/Proposta. Necessário para lookup de histórico por negócio no Rastreador de Negócios e no Workflow de Progressão."
        },
        {
          "fieldName": "performed_by",
          "targetEntity": "UserAccount",
          "targetOwnership": "horizontalOwned",
          "reason": "Rastreabilidade de quem executou a transição. Suporta rule-rbac-data-isolation e auditoria de conformidade."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_dste_deal_id_occurred_at",
          "columns": [
            "deal_id",
            "occurred_at"
          ],
          "unique": false,
          "reason": "Lookup principal: buscar histórico cronológico de transições de um negócio específico. Usado pelo Rastreador de Negócios e pelo Workflow de Progressão de Etapas."
        },
        {
          "indexName": "idx_dste_occurred_at",
          "columns": [
            "occurred_at"
          ],
          "unique": false,
          "reason": "Filtro por período para o Dashboard Operacional e análise de pipeline (ex: transições do mês corrente)."
        },
        {
          "indexName": "idx_dste_to_stage_occurred_at",
          "columns": [
            "to_stage",
            "occurred_at"
          ],
          "unique": false,
          "reason": "Suporta queries de funil: quantos negócios chegaram a cada etapa em um período. Alimenta métricas de DealPipelineMetric e LeadConversionMetric."
        },
        {
          "indexName": "idx_dste_performed_by",
          "columns": [
            "performed_by"
          ],
          "unique": false,
          "reason": "Filtro por corretor para isolamento RBAC (rule-rbac-data-isolation): corretor visualiza apenas transições realizadas por ele."
        }
      ],
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "DealPipelineMetric",
          "LeadConversionMetric"
        ],
        "updatedByLayer": "layer_3_usecases"
      },
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "rulesApplied": [
        "rule-deal-stage-transition",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/dealStageTransitionEventLog.defs.ts",
      "exportName": "dealStageTransitionEventLogTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default dealStageTransitionEventLogTableDefinition;
