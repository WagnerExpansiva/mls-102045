/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/plugins/photoUpload.defs.ts" enhancement="_blank"/>

export const photoUploadPluginConnectionPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginConnection",
  "artifactId": "photoUpload",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 14,
    "planId": "plan-plugins"
  },
  "data": {
    "plugin": {
      "pluginId": "photoUpload",
      "provider": "Photo Upload",
      "priority": "later",
      "reason": "Plugin para upload e armazenamento de fotos reais de imóveis, substituindo as URLs de placeholder do picsum.photos. Explicitamente adiado para versão futura na clarificação.",
      "events": [
        "photo.uploaded",
        "photo.deleted",
        "photo.reordered"
      ],
      "requiredCredentials": [
        "STORAGE_PROVIDER_KEY",
        "STORAGE_BUCKET_NAME"
      ],
      "inputData": [
        "propertyId",
        "photoFile",
        "photoOrder",
        "caption"
      ],
      "outputData": [
        "photoUrl",
        "thumbnailUrl",
        "photoId",
        "storageKey"
      ],
      "webhooks": [],
      "risks": [
        "Escolha do provedor de armazenamento (AWS S3, Google Cloud Storage, Cloudinary etc.) impacta custos e configuração.",
        "Validação de tamanho e formato de arquivo deve ser implementada para evitar uploads inválidos.",
        "Migração das URLs mock para fotos reais requer estratégia de transição para dados existentes."
      ],
      "questions": [
        "Qual provedor de armazenamento de arquivos será utilizado para as fotos reais (AWS S3, Cloudinary, Google Cloud Storage)?",
        "Existe limite de número de fotos por imóvel ou tamanho máximo por arquivo?"
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102045_/l2/plugins/photoUpload/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102045_/l2/propertyFlowCrm/plugins/photoUpload.defs.ts"
    }
  }
} as const;

export default photoUploadPluginConnectionPlan;
