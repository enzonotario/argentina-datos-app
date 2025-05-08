import * as Plot from 'npm:@observablehq/plot';
import { getSelectedActa } from './actaInput.js';
import {
  VOTE_COLORS,
  VOTE_DISPLAY_NAMES,
  processVotesWithDetails,
  groupVotesByProvince,
} from './senadoActasUtils.js';

export function senadoActasProvinciaChart({ actaSeleccionado }, { width, height }) {
  const selectedActa = getSelectedActa(actaSeleccionado);

  if (!selectedActa || !selectedActa.votos) {
    return Plot.plot({
      title: 'No hay datos de votos disponibles para esta acta',
      width,
      height: height - 50,
    });
  }

  const votesWithDetails = processVotesWithDetails(selectedActa);

  const data = groupVotesByProvince(votesWithDetails);

  const flattenedData = data.flatMap((d) => [
    { provincia: d.provincia, tipo: VOTE_DISPLAY_NAMES['si'], tipoOriginal: 'si', valor: d.si },
    { provincia: d.provincia, tipo: VOTE_DISPLAY_NAMES['no'], tipoOriginal: 'no', valor: d.no },
    {
      provincia: d.provincia,
      tipo: VOTE_DISPLAY_NAMES['abstencion'],
      tipoOriginal: 'abstencion',
      valor: d.abstencion,
    },
    {
      provincia: d.provincia,
      tipo: VOTE_DISPLAY_NAMES['ausente'],
      tipoOriginal: 'ausente',
      valor: d.ausente,
    },
    {
      provincia: d.provincia,
      tipo: VOTE_DISPLAY_NAMES['no emite'],
      tipoOriginal: 'no emite',
      valor: d['no emite'],
    },
    {
      provincia: d.provincia,
      tipo: VOTE_DISPLAY_NAMES['desconocido'],
      tipoOriginal: 'desconocido',
      valor: d.desconocido,
    },
  ]);

  return Plot.plot({
    title: 'Votos por Provincia',
    width,
    height: height - 70,
    marginLeft: 150,
    x: {
      grid: true,
      label: 'Cantidad de Votos',
      interval: 1,
    },
    y: {
      label: null,
    },
    color: {
      domain: ['si', 'no', 'abstencion', 'ausente', 'no emite', 'desconocido'].map(
        (type) => VOTE_DISPLAY_NAMES[type],
      ),
      range: [
        VOTE_COLORS.si,
        VOTE_COLORS.no,
        VOTE_COLORS.abstencion,
        VOTE_COLORS.ausente,
        VOTE_COLORS['no emite'],
        VOTE_COLORS.desconocido,
      ],
      legend: true,
    },
    marks: [
      Plot.barX(flattenedData, {
        y: 'provincia',
        x: 'valor',
        fill: 'tipo',
        sort: { y: '-x' },
        tip: true,
        offset: null,
        stacked: true,
      }),
    ],
  });
}
