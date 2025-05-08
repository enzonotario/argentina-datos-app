import { Generators } from 'npm:@observablehq/stdlib';
import * as Inputs from 'npm:@observablehq/inputs';
import { format, subDays } from 'npm:date-fns';

export const periodoInput = Inputs.radio(['1 año', '5 años', 'Todo'], {
  value: '1 año',
  label: 'Periodo',
});

export const periodoSeleccionado = Generators.input(periodoInput);

export const periodos = {
  '1 año': 365,
  '5 años': 1825,
  Todo: 'Todo',
};

export function filtrarPorPeriodo(collection, periodo) {
  return collection.when(periodo !== 'Todo', (collection) =>
    collection.where('fecha', '>=', format(subDays(new Date(), periodos[periodo]), 'yyyy-MM-dd')),
  );
}
