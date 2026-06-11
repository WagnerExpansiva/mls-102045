/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/plugins/calend.defs.ts" enhancement="_blank"/>

export const calendPluginConnectionPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "pluginConnection",
  "artifactId": "calend",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPlugins",
    "stepId": 14,
    "planId": "plan-plugins"
  },
  "data": {
    "plugin": {
      "pluginId": "calend",
      "provider": "Calend",
      "priority": "later",
      "reason": "Plugin para sincronização do agendador de visitas com calendários externos (Google Calendar, Microsoft Outlook). Identificado como risco de negócio mas fora do escopo do MVP — avaliação para versão futura.",
      "events": [
        "calendar.eventCreated",
        "calendar.eventUpdated",
        "calendar.eventCancelled",
        "calendar.syncCompleted"
      ],
      "requiredCredentials": [
        "GOOGLE_CALENDAR_CLIENT_ID",
        "GOOGLE_CALENDAR_CLIENT_SECRET",
        "OUTLOOK_CLIENT_ID",
        "OUTLOOK_CLIENT_SECRET"
      ],
      "inputData": [
        "visitId",
        "visitDateTime",
        "leadName",
        "propertyAddress",
        "corretorEmail",
        "calendarProvider"
      ],
      "outputData": [
        "externalEventId",
        "calendarLink",
        "syncStatus"
      ],
      "webhooks": [
        "calendar.eventChanged"
      ],
      "risks": [
        "Autenticação OAuth com Google/Microsoft requer configuração de aplicativo nas respectivas plataformas.",
        "Sincronização bidirecional pode gerar conflitos se o corretor editar o evento diretamente no calendário externo.",
        "Escopo de permissões OAuth pode ser sensível para usuários corporativos."
      ],
      "questions": [
        "A integração deve suportar Google Calendar, Microsoft Outlook ou ambos?",
        "A sincronização será unidirecional (PropertyFlowCRM → Calendário) ou bidirecional?"
      ],
      "resolution": "create_draft",
      "pluginDefsFileRef": "_102045_/l2/plugins/calend/plugin.defs.ts",
      "moduleConnectionDefsFileRef": "_102045_/l2/propertyFlowCrm/plugins/calend.defs.ts"
    }
  }
} as const;

export default calendPluginConnectionPlan;
