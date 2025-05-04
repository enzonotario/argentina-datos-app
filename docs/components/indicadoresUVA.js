import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import { format } from "npm:date-fns";
import colors from "npm:tailwind-colors";
import { Generators, FileAttachment } from "npm:@observablehq/stdlib";
import { periodoInput, periodoSeleccionado, filtrarPorPeriodo } from "./periodoInput.js";

const uva = await FileAttachment("../data/uva.json").json();

export const periodoUVAInput = periodoInput;
export const periodoUVASeleccionado = periodoSeleccionado;

function mapDates(item) {
  return {
    ...item,
    fecha: new Date(item.fecha),
  };
}

function calcularVariacionUVA(data) {
  const result = [];
  for (let i = 1; i < data.length; i++) {
    const anterior = data[i - 1].valor;
    const actual = data[i].valor;
    const variacion = ((actual - anterior) / anterior) * 100;

    result.push({
      fecha: data[i].fecha,
      valor: variacion
    });
  }
  return result;
}

export function indicadoresUVA({ periodo = "1 año" }, { width, height }) {
  const uvaData = filtrarPorPeriodo(collect(uva), periodo)
    .map(item => mapDates(item))
    .toArray();

  return Plot.plot({
    title: "Valor de UVA",
    width,
    height: height - 50,
    y: { 
      grid: true, 
      label: "Valor (ARS)",
      tickFormat: d => `$${d.toFixed(2)}`
    },
    x: {
      label: "Fecha",
      tickFormat: (d, i) => {
        const date = new Date(d);
        return format(date, "MMM yyyy");
      }
    },
    marks: [
      Plot.ruleY([0]),
      Plot.line(uvaData, {
        x: "fecha",
        y: "valor",
        stroke: colors.green[500],
        strokeWidth: 2,
        tip: true,
      }),
      Plot.dot(uvaData, {
        x: "fecha",
        y: "valor",
        fill: colors.green[500],
        r: 3,
        tip: {
          format: {
            fecha: d => format(new Date(d), "dd/MM/yyyy"),
            valor: d => `$${d.toFixed(2)}`
          }
        }
      })
    ],
  });
}
