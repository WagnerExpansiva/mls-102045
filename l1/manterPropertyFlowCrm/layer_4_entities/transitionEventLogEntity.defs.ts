/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_4_entities/transitionEventLogEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "transitionEventLogEntity",
  "title": "Entidade: Logs de Transição de Etapa/Status",
  "purpose": "Agrupa os quatro logs de eventos de transição (Lead, Deal, Visit, Property) que registram cada mudança de estado com timestamp, ator e motivo. Serve como fonte para métricas e auditoria.",
  "layer": "layer_4_entities",
  "sourceTables": [
    {
      "tableName": "lead_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "deal_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "visit_status_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "property_status_transition_event_log",
      "ownership": "moduleOwned"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "list"
  ],
  "rulesApplied": [
    "rule-lead-stage-transition",
    "rule-deal-stage-transition",
    "rule-property-status-transition",
    "rule-visit-no-conflict"
  ],
  "usecaseRefs": [
    "moveLeadStageUsecase",
    "advanceDealStageUsecase",
    "updateVisitStatusUsecase",
    "updatePropertyStatusUsecase",
    "classifyLeadAiUsecase",
    "getFollowUpSuggestionUsecase",
    "queryDashboardMetricsUsecase"
  ],
  "materialization": {
    "fileName": "layer_4_entities/TransitionEventLogEntity.ts",
    "className": "TransitionEventLogEntity",
    "contractName": "ITransitionEventLogEntity"
  }
} as const;

export default entity;
