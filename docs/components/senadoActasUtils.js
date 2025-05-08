import { FileAttachment } from 'npm:@observablehq/stdlib';
import colors from 'npm:tailwind-colors';
import { collect } from 'npm:collect.js';

export const senadores = await FileAttachment('../data/senadores.json').json();

export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s]/gi, '') // Remove special characters
    .trim();
}

export const VOTE_TYPES = ['si', 'no', 'ausente', 'abstencion', 'no emite', 'desconocido'];

export const VOTE_COLORS = {
  si: colors.green[500],
  no: colors.red[500],
  ausente: colors.yellow[500],
  abstencion: colors.blue[500],
  'no emite': colors.gray[500],
  desconocido: colors.purple[500],
};

export const VOTE_DISPLAY_NAMES = {
  si: 'Afirmativo',
  no: 'Negativo',
  ausente: 'Ausente',
  abstencion: 'Abstención',
  'no emite': 'No emite',
  desconocido: 'Desconocido',
};

export const RESULTADO_DISPLAY_NAMES = {
  afirmativa: 'Afirmativa',
  negativa: 'Negativa',
  'cancelada lev.vot.': 'Cancelada Lev.Vot.',
};

export const RESULTADO_COLORS = {
  afirmativa: colors.green[500],
  negativa: colors.red[500],
  'cancelada lev.vot.': colors.yellow[500],
};

export const PARTIDO_COLORS = [
  colors.blue[500],
  colors.yellow[500],
  colors.red[500],
  colors.green[500],
  colors.purple[500],
  colors.orange[500],
  colors.pink[500],
  colors.indigo[500],
  colors.gray[500],
];

export function createSenadorMaps() {
  const senadorNombreProvincias = {};
  const senadorNombrePartidos = {};

  senadores.forEach((senador) => {
    const normalizedName = normalizeText(senador.nombre);
    senadorNombreProvincias[normalizedName] = senador.provincia;
    senadorNombrePartidos[normalizedName] = senador.partido;
  });

  return { senadorNombreProvincias, senadorNombrePartidos };
}

export function processVotesWithDetails(selectedActa) {
  if (!selectedActa || !selectedActa.votos) {
    return [];
  }

  const { senadorNombreProvincias, senadorNombrePartidos } = createSenadorMaps();

  return selectedActa.votos.map((voto) => {
    const normalizedNombreVoto = normalizeText(voto.nombre);

    const provincia =
      senadorNombreProvincias[normalizedNombreVoto] || voto.provincia || 'Desconocida';
    const partido = senadorNombrePartidos[normalizedNombreVoto] || voto.partido || 'Desconocido';

    return {
      ...voto,
      provincia,
      partido,
    };
  });
}

export function countVotesByType(votes) {
  return VOTE_TYPES.map((type) => ({
    tipo: VOTE_DISPLAY_NAMES[type],
    color: VOTE_COLORS[type],
    tipoOriginal: type,
    cantidad: votes.filter((voto) => voto.voto === type).length,
  })).filter((item) => item.cantidad > 0);
}

export function groupVotesByProvince(votes) {
  const votesByProvince = collect(votes)
    .groupBy('provincia')
    .map((grupo, provincia) => ({
      provincia,
      total: grupo.count(),
      si: grupo.filter((voto) => voto.voto === 'si').count(),
      no: grupo.filter((voto) => voto.voto === 'no').count(),
      abstencion: grupo.filter((voto) => voto.voto === 'abstencion').count(),
      ausente: grupo.filter((voto) => voto.voto === 'ausente').count(),
      'no emite': grupo.filter((voto) => voto.voto === 'no emite').count(),
      desconocido: grupo.filter((voto) => voto.voto === 'desconocido').count(),
    }))
    .sortByDesc('total')
    .first();

  return Object.entries(votesByProvince).map(
    ([provincia, { total, si, no, abstencion, ausente, 'no emite': noEmite, desconocido }]) => ({
      provincia,
      total,
      si,
      no,
      abstencion,
      ausente,
      'no emite': noEmite,
      desconocido,
    }),
  );
}

export function groupVotesByParty(votes) {
  const votesByParty = collect(votes)
    .groupBy('partido')
    .map((grupo, partido) => ({
      partido,
      total: grupo.count(),
      si: grupo.filter((voto) => voto.voto === 'si').count(),
      no: grupo.filter((voto) => voto.voto === 'no').count(),
      abstencion: grupo.filter((voto) => voto.voto === 'abstencion').count(),
      ausente: grupo.filter((voto) => voto.voto === 'ausente').count(),
      'no emite': grupo.filter((voto) => voto.voto === 'no emite').count(),
      desconocido: grupo.filter((voto) => voto.voto === 'desconocido').count(),
    }))
    .sortByDesc('total')
    .first();

  return Object.entries(votesByParty).map(
    ([partido, { total, si, no, abstencion, ausente, 'no emite': noEmite, desconocido }]) => ({
      partido,
      total,
      si,
      no,
      abstencion,
      ausente,
      'no emite': noEmite,
      desconocido,
    }),
  );
}
