import * as Inputs from 'npm:@observablehq/inputs';
import { getSelectedActa } from './actaInput.js';
import { VOTE_DISPLAY_NAMES, processVotesWithDetails } from './senadoActasUtils.js';

export function senadoActasTable({ actaSeleccionado }) {
  const selectedActa = getSelectedActa(actaSeleccionado);

  if (!selectedActa || !selectedActa.votos) {
    return Inputs.table([{ mensaje: 'No hay datos de votos disponibles para esta acta' }]);
  }

  const votesWithDetails = processVotesWithDetails(selectedActa);

  const sortedVotes = [...votesWithDetails].sort((a, b) => a.nombre.localeCompare(b.nombre));

  const processedVotes = sortedVotes.map((vote) => ({
    Senador: String(vote.nombre || ''),
    Provincia: String(vote.provincia || ''),
    Partido: String(vote.partido || ''),
    Voto: String(VOTE_DISPLAY_NAMES[vote.voto] || ''),
  }));

  return Inputs.table(processedVotes, {
    width: '100%',
    height: processedVotes.length * 23.5,
    layout: 'fixed',
    sort: true,
    reverse: false,
    rows: processedVotes.length,
    select: false,
    multiple: false,
  });
}
