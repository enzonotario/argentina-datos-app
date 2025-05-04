import { useApi } from "./useApi.js";

const plazoFijo = await useApi().fetchJson("/v1/finanzas/tasas/plazoFijo");

const data = {
  plazoFijo
};

process.stdout.write(JSON.stringify(data));
