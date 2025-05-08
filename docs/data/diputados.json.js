import { useApi } from './useApi.js';
import { collect } from 'collect.js';

const diputados = await useApi().fetchJson('/v1/diputados/diputados');

const today = new Date();

const data = collect(diputados)
  .sortBy('id')
  .sortByDesc('periodoMandato.inicio')
  .sortByDesc('periodoBloque.inicio')
  .groupBy('id')
  .map((diputados) => diputados.first())
  .filter(
    (diputado) =>
      new Date(diputado.periodoMandato.fin) >= today && new Date(diputado.ceseFecha) >= today,
  )
  .map((diputado) => ({
    ...diputado,
    nombreCompleto: `${diputado.apellido}, ${diputado.nombre}`,
  }))
  .toArray();
// .map(diputado => ({
//   id: diputado.id,
//   nombre: diputado.nombre,
//   provincia: diputado.provincia,
//   partido: diputado.partido,
//   periodoLegal: diputado.periodoLegal,
//   periodoReal: diputado.periodoReal,
//   foto: diputado.foto
// }));

process.stdout.write(JSON.stringify(data));
