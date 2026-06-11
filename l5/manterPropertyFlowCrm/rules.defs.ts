/// <mls fileReference="_102045_/l5/manterPropertyFlowCrm/rules.defs.ts" enhancement="_blank"/>

export const rulesPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "rules",
  "artifactId": "manterPropertyFlowCrmRules",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "moduleName": "manterPropertyFlowCrm",
    "rules": [
      {
        "ruleId": "rule-rbac-data-isolation",
        "title": "Isolamento de Dados por Perfil (RBAC)",
        "description": "Corretor e Assistente só podem visualizar e editar registros (leads, visitas, negócios) atribuídos ao seu próprio userId. Admin tem acesso irrestrito a todos os registros da imobiliária. O Assistente opera sob as mesmas capabilities do Corretor com restrições adicionais definidas pelo Admin.",
        "layer": "layer_2",
        "appliesTo": [
          "Lead",
          "Visit",
          "Deal",
          "Property",
          "Corretor"
        ]
      },
      {
        "ruleId": "rule-lead-stage-transition",
        "title": "Transições Válidas de Etapa do Lead",
        "description": "O lead só pode avançar para etapas subsequentes no funil (Novo → Contato → Visita → Proposta → Fechado/Perdido). Retrocesso é permitido apenas para Admin. A etapa 'perdido' é terminal — requer criação de novo lead para reativação. Quando um Deal vinculado ao lead atingir estado terminal (fechado/perdido), o Lead.stage deve ser sincronizado automaticamente.",
        "layer": "layer_3",
        "appliesTo": [
          "Lead",
          "LeadStageTransitionEvent"
        ]
      },
      {
        "ruleId": "rule-deal-stage-transition",
        "title": "Transições Válidas de Etapa do Negócio",
        "description": "O negócio avança pelas etapas (Proposta → Negociação → Contrato → Fechado/Perdido). As etapas 'fechado' e 'perdido' são terminais. Ao fechar um negócio, o status do imóvel vinculado deve ser atualizado automaticamente para Vendido/Alugado e o Lead vinculado deve ter sua etapa sincronizada para 'fechado'. Ao marcar como perdido, o imóvel retorna a 'disponivel' e o Lead é sincronizado para 'perdido'.",
        "layer": "layer_3",
        "appliesTo": [
          "Deal",
          "DealStageTransitionEvent",
          "Property",
          "Lead"
        ]
      },
      {
        "ruleId": "rule-property-status-transition",
        "title": "Transições Válidas de Status do Imóvel",
        "description": "Imóvel pode transitar de Disponível → Reservado (ao criar negócio) → Vendido/Alugado (ao fechar negócio). Pode retornar a Disponível se o negócio for cancelado/perdido. Imóvel com negócio ativo não pode ser marcado como Disponível manualmente. Toda transição deve gerar um PropertyStatusTransitionEvent.",
        "layer": "layer_3",
        "appliesTo": [
          "Property",
          "Deal",
          "PropertyStatusTransitionEvent"
        ]
      },
      {
        "ruleId": "rule-visit-no-conflict",
        "title": "Sem Conflito de Horário em Visitas",
        "description": "Não é permitido agendar duas visitas para o mesmo corretor no mesmo horário. O sistema deve validar conflitos de horário antes de confirmar o agendamento. Toda transição de status deve gerar um VisitStatusTransitionEvent.",
        "layer": "layer_3",
        "appliesTo": [
          "Visit",
          "VisitStatusTransitionEvent"
        ]
      },
      {
        "ruleId": "rule-llm-agent-invocation",
        "title": "Invocação de Agentes LLM",
        "description": "Agentes LLM só podem ser acionados por usuários autenticados com perfil Corretor, Assistente ou Admin. O resultado gerado pelo agente deve ser revisado pelo usuário antes de ser persistido no registro principal.",
        "layer": "layer_2",
        "appliesTo": [
          "PropertyDescriptionCommand",
          "LeadClassificationCommand",
          "FollowUpSuggestionCommand"
        ]
      },
      {
        "ruleId": "rule-deal-requires-property-and-lead",
        "title": "Negócio Requer Imóvel e Lead Vinculados",
        "description": "Todo negócio/proposta deve obrigatoriamente estar vinculado a um imóvel e a um lead. Não é permitido criar negócio sem esses vínculos.",
        "layer": "layer_3",
        "appliesTo": [
          "Deal"
        ]
      },
      {
        "ruleId": "rule-visit-requires-property-lead-corretor",
        "title": "Visita Requer Imóvel, Lead e Corretor",
        "description": "Toda visita deve obrigatoriamente estar vinculada a um imóvel, um lead e um corretor responsável.",
        "layer": "layer_3",
        "appliesTo": [
          "Visit"
        ]
      }
    ]
  }
} as const;

export default rulesPlan;
