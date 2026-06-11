/// <mls fileReference="_102045_/l2/plugins/i18n/plugin.defs.ts" enhancement="_blank"/>

export const i18nPluginPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginDraft",
  "artifactId": "i18n",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 14,
    "planId": "plan-plugins"
  },
  "data": {
    "plugin": {
      "pluginId": "i18n",
      "provider": "I18n",
      "priority": "now",
      "reason": "Plugin para gerenciar traduções e alternância de idioma entre pt-BR (padrão) e inglês em toda a interface do PropertyFlowCRM. Requisito explícito definido na clarificação.",
      "events": [
        "i18n.languageChanged",
        "i18n.translationMissing"
      ],
      "requiredCredentials": [],
      "inputData": [
        "locale",
        "translationKey",
        "interpolationParams"
      ],
      "outputData": [
        "translatedText",
        "currentLocale",
        "availableLocales"
      ],
      "webhooks": [],
      "risks": [
        "Chaves de tradução ausentes podem causar fallback para o idioma padrão sem aviso visível ao usuário.",
        "Manutenção de dois conjuntos de traduções (pt-BR e en) aumenta o esforço de atualização de conteúdo."
      ],
      "questions": [
        "As traduções serão gerenciadas diretamente no código (arquivos JSON/TS) ou via plataforma externa de localização?",
        "Existe necessidade de suporte a outros idiomas além de pt-BR e en no futuro próximo?"
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102045_/l2/plugins/i18n/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102045_/l2/propertyFlowCrm/plugins/i18n.defs.ts"
    }
  }
} as const;

export default i18nPluginPlan;
