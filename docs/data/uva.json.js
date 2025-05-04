import { useApi } from "./useApi.js";

const uva = await useApi().fetchJson("/v1/finanzas/indices/uva");

process.stdout.write(JSON.stringify(uva));