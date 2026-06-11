/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/plugins/mockImage.defs.ts" enhancement="_blank"/>

export const mockImagePluginConnectionPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginConnection",
  "artifactId": "mockImage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 14,
    "planId": "plan-plugins"
  },
  "data": {
    "plugin": {
      "pluginId": "mockImage",
      "provider": "Mock Image",
      "priority": "now",
      "reason": "Plugin utilitário para gerar e gerenciar URLs de imagens placeholder (picsum.photos) para fotos de imóveis no MVP. Encapsula a lógica para facilitar migração futura para upload real.",
      "events": [
        "mockImage.urlGenerated"
      ],
      "requiredCredentials": [],
      "inputData": [
        "imageId",
        "width",
        "height",
        "seed"
      ],
      "outputData": [
        "imageUrl",
        "thumbnailUrl"
      ],
      "webhooks": [],
      "risks": [
        "Dependência de serviço externo (picsum.photos) — indisponibilidade do serviço impacta a exibição de fotos no MVP.",
        "URLs geradas são públicas e não representam imóveis reais, podendo causar confusão em demonstrações para clientes."
      ],
      "questions": [
        "O plugin mockImage e o picsumPhotos representam a mesma integração? Confirmar se apenas um deles deve ser utilizado para evitar duplicidade."
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102045_/l2/plugins/mockImage/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102045_/l2/propertyFlowCrm/plugins/mockImage.defs.ts"
    }
  }
} as const;

export default mockImagePluginConnectionPlan;
