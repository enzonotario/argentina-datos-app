import { Generators } from 'npm:@observablehq/stdlib';
import * as Inputs from 'npm:@observablehq/inputs';
import { FileAttachment } from 'npm:@observablehq/stdlib';
import { format, parseISO } from 'npm:date-fns';

const actas = await FileAttachment('../data/senadoActas.json').json();

const actasForTable = actas.reverse().map((acta) => ({
  ID: acta.actaId,
  Fecha: acta.fecha ? format(parseISO(acta.fecha), 'dd/MM/yyyy HH:mm') : '',
  Resultado: acta.resultado,
  Título: acta.titulo || 'Desconocido'
}));

export const actaInput = Inputs.table(actasForTable, {
  label: 'Seleccionar Acta',
  sort: true,
  value: actas.length > 0 ? actasForTable[0] : null,
  format: {
    ID: (d) => d,
    Fecha: (d) => d,
    Título: (d) => d,
  },
  width: {
    ID: 40,
    Fecha: 80,
  },
  height: Math.min(actasForTable.length * 23.5, 300),
  rows: Math.min(actasForTable.length, 10),
  layout: 'fixed',
  multiple: false,
  select: true,
});

export const actaSeleccionado = Generators.input(actaInput);

export function getSelectedActa(selectedRow) {
  const actaId = selectedRow ? selectedRow.ID : null;
  return actas.find((acta) => acta.actaId === actaId) || (actas.length > 0 ? actas[0] : null);
}
