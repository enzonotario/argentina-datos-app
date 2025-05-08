import { useApi } from './useApi.js';

const actas = await useApi().fetchJson('/v1/senado/actas');

// Map the data to include only the necessary fields and ensure titulo and fecha are strings
const data = actas.map((acta) => ({
  actaId: acta.actaId,
  titulo: String(acta.titulo || ''),
  fecha: String(acta.fecha || ''),
  votos: acta.votos,
  resultado: acta.resultado,
}));

process.stdout.write(JSON.stringify(data));
