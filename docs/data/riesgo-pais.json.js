import { useApi } from './useApi.js';

const riesgoPais = await useApi().fetchJson('/v1/finanzas/indices/riesgo-pais');

process.stdout.write(JSON.stringify(riesgoPais));
