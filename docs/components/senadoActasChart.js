import * as Plot from 'npm:@observablehq/plot';
import { html } from 'npm:htl';
import { getSelectedActa } from './actaInput.js';
import {
  VOTE_TYPES,
  VOTE_COLORS,
  VOTE_DISPLAY_NAMES,
  RESULTADO_DISPLAY_NAMES,
  RESULTADO_COLORS,
  countVotesByType,
} from './senadoActasUtils.js';

export function senadoActasChart({ actaSeleccionado }, { width, height }) {
  const selectedActa = getSelectedActa(actaSeleccionado);

  if (!selectedActa || !selectedActa.votos) {
    return Plot.plot({
      title: 'No hay datos de votos disponibles para esta acta',
      width,
      height: height - 50,
    });
  }

  const voteCounts = countVotesByType(selectedActa.votos);

  return Plot.plot({
    title: 'Votos por Tipo',
    width,
    height: height - 50,
    color: {
      domain: VOTE_TYPES.map((type) => VOTE_DISPLAY_NAMES[type]),
      range: VOTE_TYPES.map((type) => VOTE_COLORS[type]),
    },
    marks: [
      Plot.barY(voteCounts, {
        x: 'tipo',
        y: 'cantidad',
        fill: 'color',
        tip: true,
      }),
      Plot.text(voteCounts, {
        x: 'tipo',
        y: 'cantidad',
        text: (d) => d.cantidad,
        dy: -10,
        fontSize: 14,
        fontWeight: 'bold',
      }),
    ],
  });
}
