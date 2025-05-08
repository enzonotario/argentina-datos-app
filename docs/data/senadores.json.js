import { useApi } from './useApi.js';

const senadores = await useApi().fetchJson('/v1/senado/senadores');

const today = new Date();
const [year, month, day] = today.toISOString().split('T')[0].split('-');

const data = senadores
  .filter((senador) => {
    if (!senador.periodoLegal.fin) {
      return true;
    }

    const [yearFin, monthFin, dayFin] = senador.periodoLegal.fin.split('-');

    return (
      yearFin > year ||
      (yearFin === year && monthFin > month) ||
      (yearFin === year && monthFin === month && dayFin >= day)
    );
  })
  .map((senador) => ({
    id: senador.id,
    nombre: senador.nombre,
    provincia: senador.provincia,
    partido: senador.partido,
    periodoLegal: senador.periodoLegal,
    periodoReal: senador.periodoReal,
    foto: senador.foto,
  }));

process.stdout.write(JSON.stringify(data));
