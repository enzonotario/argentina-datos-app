import * as Plot from 'npm:@observablehq/plot';
import { getSelectedActa } from './actaInput.js';
import { VOTE_COLORS, VOTE_DISPLAY_NAMES, processVotesWithDetails } from './senadoActasUtils.js';

export function senadoActasHeatmapChart({ actaSeleccionado }, { width, height }) {
  const selectedActa = getSelectedActa(actaSeleccionado);

  if (!selectedActa || !selectedActa.votos) {
    return Plot.plot({
      title: 'No hay datos de votos disponibles para esta acta',
      width,
      height: height - 50,
    });
  }

  const votesWithDetails = processVotesWithDetails(selectedActa);

  const heatmapData = [];

  const parties = [...new Set(votesWithDetails.map((vote) => vote.partido))].sort();
  const provinces = [...new Set(votesWithDetails.map((vote) => vote.provincia))].sort();

  for (const partido of parties) {
    for (const provincia of provinces) {
      const partyProvinceVotes = votesWithDetails.filter(
        (vote) => vote.partido === partido && vote.provincia === provincia,
      );

      if (partyProvinceVotes.length > 0) {
        const siVotes = partyProvinceVotes.filter((vote) => vote.voto === 'si').length;
        const noVotes = partyProvinceVotes.filter((vote) => vote.voto === 'no').length;
        const abstencionVotes = partyProvinceVotes.filter(
          (vote) => vote.voto === 'abstencion',
        ).length;
        const ausenteVotes = partyProvinceVotes.filter((vote) => vote.voto === 'ausente').length;

        const voteTypes = [
          { type: 'si', count: siVotes },
          { type: 'no', count: noVotes },
          { type: 'abstencion', count: abstencionVotes },
          { type: 'ausente', count: ausenteVotes },
        ];

        const dominantVote = voteTypes.reduce((prev, current) =>
          prev.count > current.count ? prev : current,
        );

        if (partyProvinceVotes.length > 0) {
          heatmapData.push({
            partido,
            provincia,
            total: partyProvinceVotes.length,
            si: siVotes,
            no: noVotes,
            abstencion: abstencionVotes,
            ausente: ausenteVotes,
            dominantVote: dominantVote.type,
            dominantVoteCount: dominantVote.count,
            dominantVotePercentage: Math.round(
              (dominantVote.count / partyProvinceVotes.length) * 100,
            ),
          });
        }
      }
    }
  }

  return Plot.plot({
    title: 'Mapa de Calor: Votos por Partido y Provincia',
    width,
    height: height - 70,
    marginLeft: 120,
    marginBottom: 80,
    x: {
      label: 'Provincia',
      tickRotate: -45,
    },
    y: {
      label: 'Partido',
    },
    color: {
      type: 'categorical',
      domain: ['si', 'no', 'abstencion', 'ausente'].map((type) => VOTE_DISPLAY_NAMES[type]),
      range: ['si', 'no', 'abstencion', 'ausente'].map((type) => VOTE_COLORS[type]),
      legend: true,
    },
    marks: [
      Plot.cell(heatmapData, {
        x: 'provincia',
        y: 'partido',
        fill: (d) => VOTE_DISPLAY_NAMES[d.dominantVote],
        fillOpacity: (d) => d.dominantVotePercentage / 100,
        stroke: 'gray',
        strokeOpacity: 0.2,
        tip: true,
        title: (d) =>
          `${d.partido} - ${d.provincia}\nTotal: ${d.total}\nAfirmativo: ${d.si}\nNegativo: ${
            d.no
          }\nAbstención: ${d.abstencion}\nAusente: ${d.ausente}\nDominante: ${
            VOTE_DISPLAY_NAMES[d.dominantVote]
          } (${d.dominantVotePercentage}%)`,
      }),
      Plot.text(heatmapData, {
        x: 'provincia',
        y: 'partido',
        text: (d) => (d.total > 0 ? d.total : ''),
        fontSize: 10,
        fontWeight: 'bold',
      }),
    ],
  });
}
