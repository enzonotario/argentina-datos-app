import * as Plot from 'npm:@observablehq/plot';
import { collect } from 'npm:collect.js';
import { format } from 'npm:date-fns';
import colors from 'npm:tailwind-colors';
import { Generators, FileAttachment } from 'npm:@observablehq/stdlib';
import * as Inputs from 'npm:@observablehq/inputs';

const tasas = await FileAttachment('../data/tasas.json').json();

export const tipoTasaInput = Inputs.radio(['Clientes', 'No Clientes'], {
  value: 'Clientes',
  label: 'Tipo de tasa para Plazo Fijo',
});

export const tipoTasaSeleccionado = Generators.input(tipoTasaInput);

function prepararDatosPlazoFijo(data, tipoTasa) {
  return collect(data)
    .map((item) => ({
      entidad: item.entidad,
      tasa: tipoTasa === 'Clientes' ? item.tnaClientes : item.tnaNoClientes,
      tipo: 'Plazo Fijo',
    }))
    .toArray();
}

export function tasasChart({ tipo }, { width, height }) {
  let data = prepararDatosPlazoFijo(tasas.plazoFijo, tipo);

  data.sort((a, b) => b.tasa - a.tasa);

  if (data.length > 20) {
    data = data.slice(0, 20);
  }

  const label = 'Tasa (%)';
  const tickFormat = (d) => `${d.toFixed(2)}%`;

  return Plot.plot({
    title: `Comparativa de Plazo Fijo - ${tipo}`,
    width,
    height: height - 50,
    marginLeft: 150,
    x: {
      grid: true,
      label: label,
      tickFormat: tickFormat,
    },
    y: {
      label: null,
      domain: data.map((d) => d.entidad),
    },
    marks: [
      Plot.barX(data, {
        y: 'entidad',
        x: 'tasa',
        fill: colors.purple[500],
        sort: { y: 'x', reverse: true },
        tip: {
          format: {
            entidad: true,
            tasa: (d) => `${d.toFixed(2)}%`,
          },
        },
      }),
    ],
  });
}
