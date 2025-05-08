import * as Plot from 'npm:@observablehq/plot';
import { getSelectedActa } from './actaInput.js';
import { VOTE_COLORS, VOTE_DISPLAY_NAMES, processVotesWithDetails } from './senadoActasUtils.js';

export function senadoActasComparisonChart({ actaSeleccionado }, { width, height }) {
  const selectedActa = getSelectedActa(actaSeleccionado);

  if (!selectedActa || !selectedActa.votos) {
    return Plot.plot({
      title: 'No hay datos de votos disponibles para esta acta',
      width,
      height: height - 50,
    });
  }

  const votesWithDetails = processVotesWithDetails(selectedActa);

  const parties = [...new Set(votesWithDetails.map((vote) => vote.partido))].sort();

  const comparisonData = parties.flatMap((partido) => {
    const partyVotes = votesWithDetails.filter((vote) => vote.partido === partido);
    const total = partyVotes.length;

    if (total === 0) return [];

    return [
      {
        partido,
        votoTipo: VOTE_DISPLAY_NAMES['si'],
        porcentaje: Math.round(
          (partyVotes.filter((vote) => vote.voto === 'si').length / total) * 100,
        ),
        cantidad: partyVotes.filter((vote) => vote.voto === 'si').length,
        total,
      },
      {
        partido,
        votoTipo: VOTE_DISPLAY_NAMES['no'],
        porcentaje: Math.round(
          (partyVotes.filter((vote) => vote.voto === 'no').length / total) * 100,
        ),
        cantidad: partyVotes.filter((vote) => vote.voto === 'no').length,
        total,
      },
      {
        partido,
        votoTipo: VOTE_DISPLAY_NAMES['abstencion'],
        porcentaje: Math.round(
          (partyVotes.filter((vote) => vote.voto === 'abstencion').length / total) * 100,
        ),
        cantidad: partyVotes.filter((vote) => vote.voto === 'abstencion').length,
        total,
      },
      {
        partido,
        votoTipo: VOTE_DISPLAY_NAMES['ausente'],
        porcentaje: Math.round(
          (partyVotes.filter((vote) => vote.voto === 'ausente').length / total) * 100,
        ),
        cantidad: partyVotes.filter((vote) => vote.voto === 'ausente').length,
        total,
      },
    ].filter((d) => d.porcentaje > 0);
  });

  const significantParties = parties.filter(
    (partido) => votesWithDetails.filter((vote) => vote.partido === partido).length,
  );

  const filteredData = comparisonData.filter((d) => significantParties.includes(d.partido));

  return Plot.plot({
    title: 'Comparación de Votos por Partido (Porcentaje)',
    width,
    height: height - 70,
    marginLeft: 150,
    x: {
      label: 'Porcentaje de Votos',
      grid: true,
      domain: [0, 100],
      tickFormat: (d) => `${d}%`,
    },
    y: {
      label: null,
      domain: significantParties,
    },
    color: {
      domain: ['si', 'no', 'abstencion', 'ausente'].map((type) => VOTE_DISPLAY_NAMES[type]),
      range: ['si', 'no', 'abstencion', 'ausente'].map((type) => VOTE_COLORS[type]),
      legend: true,
    },
    marks: [
      Plot.barX(filteredData, {
        x: 'porcentaje',
        y: 'partido',
        fill: 'votoTipo',
        tip: true,
        title: (d) => `${d.partido}\n${d.votoTipo}: ${d.cantidad} de ${d.total} (${d.porcentaje}%)`,
        sort: { y: '-x' },
      }),
      Plot.text(
        filteredData.filter((d) => d.porcentaje >= 10),
        {
          x: (d) => d.porcentaje,
          y: 'partido',
          text: (d) => `${d.porcentaje}%`,
          fontWeight: 'bold',
          filter: (d) => d.porcentaje >= 15,
        },
      ),
    ],
    facet: {
      data: filteredData,
      x: 'votoTipo',
      marginRight: 90,
    },
  });
}
