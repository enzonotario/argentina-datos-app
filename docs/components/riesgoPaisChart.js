
import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import { format } from "npm:date-fns";
import colors from "npm:tailwind-colors";
import { Generators, FileAttachment } from "npm:@observablehq/stdlib";
import { periodoInput, periodoSeleccionado, filtrarPorPeriodo } from "./periodoInput.js";

const riesgoPais = await FileAttachment("../data/riesgo-pais.json").json();

export const periodoRiesgoInput = periodoInput;
export const periodoRiesgoSeleccionado = periodoSeleccionado;

function mapDates(item) {
  return {
    ...item,
    fecha: new Date(item.fecha),
  };
}

export function riesgoPaisChart({ periodo = "1 año" }, { width, height }) {
  const collection = filtrarPorPeriodo(collect(riesgoPais), periodo)
    .map(item => mapDates(item))
    .toArray();

  return Plot.plot({
    title: "Evolución del Riesgo País",
    width,
    height: height - 50,
    y: { 
      grid: true, 
      label: "Puntos",
      tickFormat: d => `${d}`
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
      Plot.line(collection, {
        x: "fecha",
        y: "valor",
        stroke: colors.red[500],
        strokeWidth: 2,
        tip: true,
      }),
      Plot.dot(collection, {
        x: "fecha",
        y: "valor",
        fill: colors.red[500],
        r: 3,
        tip: {
          format: {
            fecha: d => format(new Date(d), "dd/MM/yyyy"),
            valor: d => `${d} puntos`
          }
        }
      })
    ],
  });
}
