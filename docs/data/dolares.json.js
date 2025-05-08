import { useApi } from './useApi.js';

const dolares = await useApi().fetchJson('/v1/cotizaciones/dolares');

process.stdout.write(JSON.stringify(dolares));
