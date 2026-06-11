/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_4_entities/aiCommandLogEntity.defs.ts" enhancement="_blank"/>

export const entity = {
  "entityId": "aiCommandLogEntity",
  "title": "Entidade: Log de Comandos de IA",
  "purpose": "Registra todas as invocações de agentes LLM (geração de descrição de imóvel, classificação de lead, sugestão de follow-up), armazenando input, output e metadados de execução.",
  "layer": "layer_4_entities",
  "sourceTables": [
    {
      "tableName": "ai_command_log",
      "ownership": "moduleOwned"
    }
  ],
  "allowedOperations": [
    "create",
    "read",
    "list"
  ],
  "rulesApplied": [
    "rule-llm-agent-invocation"
  ],
  "usecaseRefs": [
    "generatePropertyDescriptionUsecase",
    "classifyLeadAiUsecase",
    "getFollowUpSuggestionUsecase"
  ],
  "materialization": {
    "fileName": "layer_4_entities/AiCommandLogEntity.ts",
    "className": "AiCommandLogEntity",
    "contractName": "IAiCommandLogEntity"
  }
} as const;

export default entity;
