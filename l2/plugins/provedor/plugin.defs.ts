/// <mls fileReference="_102045_/l2/plugins/provedor/plugin.defs.ts" enhancement="_blank"/>

export const provedorPluginPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginDraft",
  "artifactId": "provedor",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 14,
    "planId": "plan-plugins"
  },
  "data": {
    "plugin": {
      "pluginId": "provedor",
      "provider": "provedor",
      "priority": "now",
      "reason": "Plugin de integração com provedor LLM (OpenAI, Anthropic, Google Gemini ou similar) obrigatório para os três agentes de IA do MVP: geração de descrição de imóvel, classificação de lead e sugestão de follow-up.",
      "events": [
        "llm.request",
        "llm.response",
        "llm.error"
      ],
      "requiredCredentials": [
        "LLM_PROVIDER_API_KEY"
      ],
      "inputData": [
        "prompt",
        "model",
        "temperature",
        "maxTokens",
        "language"
      ],
      "outputData": [
        "generatedText",
        "tokensUsed",
        "modelUsed"
      ],
      "webhooks": [],
      "risks": [
        "O provedor específico (OpenAI, Anthropic, Gemini) ainda não foi definido — a configuração da credencial depende dessa decisão do Admin.",
        "Custos de API podem variar significativamente entre provedores e volumes de uso.",
        "Latência do provedor externo pode impactar a experiência do usuário nos agentes de IA."
      ],
      "questions": [
        "Qual provedor LLM será utilizado por padrão: OpenAI, Anthropic (Claude) ou Google Gemini?",
        "O Admin poderá trocar o provedor LLM pela interface ou apenas via configuração de ambiente?"
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102045_/l2/plugins/provedor/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102045_/l2/propertyFlowCrm/plugins/provedor.defs.ts"
    }
  }
} as const;

export default provedorPluginPlan;
