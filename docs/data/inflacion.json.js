import { useApi } from "./useApi.js";

const inflacionMensual = await useApi().fetchJson("/v1/finanzas/indices/inflacion");
const inflacionInteranual = await useApi().fetchJson("/v1/finanzas/indices/inflacionInteranual");

const data = {
  mensual: inflacionMensual,
  interanual: inflacionInteranual
};

process.stdout.write(JSON.stringify(data));