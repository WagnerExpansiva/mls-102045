/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/propertyStatusTransitionEventLog.defs.ts" enhancement="_blank"/>

export const propertyStatusTransitionEventLogTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "propertyStatusTransitionEventLog",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 45,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "propertyStatusTransitionEventLog",
      "tableName": "property_status_transition_event_log",
      "title": "Log de Transições de Status do Imóvel",
      "purpose": "Registra cada mudança de status de um imóvel (disponível → reservado → vendido/alugado/inativo), preservando histórico imutável para auditoria e suporte às regras de transição válidas (rule-property-status-transition).",
      "moduleId": "propertyFlowCrm",
      "ownership": "moduleOwned",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "rootEntity": "PropertyStatusTransitionEvent",
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
          "name": "property_id",
          "type": "uuid",
          "nullable": false,
          "description": "ID do imóvel (MDM) que sofreu a transição de status. Referência externa ao domínio MDM de Imóvel."
        },
        {
          "name": "from_status",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Status de origem da transição. Enum: disponivel, reservado, vendido, alugado, inativo."
        },
        {
          "name": "to_status",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Status de destino da transição. Enum: disponivel, reservado, vendido, alugado, inativo."
        },
        {
          "name": "triggered_by",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Origem da transição: manual (Admin) ou automática via workflow (dealClosed, dealLost, dealCreated)."
        },
        {
          "name": "related_deal_id",
          "type": "uuid",
          "nullable": true,
          "description": "ID do negócio (MDM) que originou a transição automática, quando aplicável."
        },
        {
          "name": "performed_by",
          "type": "varchar(255)",
          "nullable": false,
          "description": "ID do usuário (horizontal RBAC) ou identificador do sistema que realizou a transição."
        },
        {
          "name": "occurred_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora exata da transição de status. Usado para ordenação cronológica e filtros de auditoria."
        },
        {
          "name": "details",
          "type": "jsonb",
          "nullable": true,
          "description": "Contexto adicional da transição em JSON: observações, metadados do workflow, informações de rastreabilidade não usadas em filtros."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "PropertyStatusTransitionEventDetails",
        "reason": "Armazena contexto interno da transição (observações do usuário, metadados do workflow, informações de rastreabilidade) que não são usados em filtros, joins ou lifecycle, conforme recomendação detailsColumnRecommended: true."
      },
      "foreignRefs": [
        {
          "fieldName": "property_id",
          "targetEntity": "Property",
          "targetOwnership": "mdmOwned",
          "reason": "Referência ao imóvel MDM cujo status foi alterado. Não implica criação de tabela neste módulo."
        },
        {
          "fieldName": "related_deal_id",
          "targetEntity": "Deal",
          "targetOwnership": "mdmOwned",
          "reason": "Referência opcional ao negócio MDM que originou a transição automática (dealClosed, dealLost, dealCreated)."
        },
        {
          "fieldName": "performed_by",
          "targetEntity": "UserAccount",
          "targetOwnership": "horizontalOwned",
          "reason": "Referência ao usuário horizontal (RBAC) que executou a transição, para rastreabilidade e isolamento por perfil (rule-rbac-data-isolation)."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_pste_property_id_occurred_at",
          "columns": [
            "property_id",
            "occurred_at"
          ],
          "unique": false,
          "reason": "Suporta consultas de histórico cronológico de transições por imóvel, usadas pelo Detalhe/Formulário de Imóvel e pelo Workflow de Atualização de Status."
        },
        {
          "indexName": "idx_pste_occurred_at",
          "columns": [
            "occurred_at"
          ],
          "unique": false,
          "reason": "Suporta filtros por período no Dashboard Operacional e relatórios de auditoria."
        },
        {
          "indexName": "idx_pste_to_status",
          "columns": [
            "to_status"
          ],
          "unique": false,
          "reason": "Suporta consultas de imóveis que atingiram determinado status (ex: vendido, alugado) para métricas e lista de imóveis."
        },
        {
          "indexName": "idx_pste_performed_by",
          "columns": [
            "performed_by"
          ],
          "unique": false,
          "reason": "Suporta isolamento de dados por perfil (rule-rbac-data-isolation): filtragem de eventos realizados por um corretor específico."
        },
        {
          "indexName": "idx_pste_related_deal_id",
          "columns": [
            "related_deal_id"
          ],
          "unique": false,
          "reason": "Suporta lookup de transições originadas por um negócio específico, usado pelo workflow dealStageWorkflow e auditoria de negócios."
        }
      ],
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
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "ActivePropertiesMetric"
        ],
        "updatedByLayer": "layer_3_usecases"
      },
      "rulesApplied": [
        "rule-property-status-transition",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/propertyStatusTransitionEventLog.defs.ts",
      "exportName": "propertyStatusTransitionEventLogTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default propertyStatusTransitionEventLogTableDefinition;
