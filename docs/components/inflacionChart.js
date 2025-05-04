import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import { format } from "npm:date-fns";
import colors from "npm:tailwind-colors";
import { Generators, FileAttachment } from "npm:@observablehq/stdlib";
import * as Inputs from "npm:@observablehq/inputs";
import { periodoInput, periodoSeleccionado, filtrarPorPeriodo } from "./periodoInput.js";

const inflacion = await FileAttachment("../data/inflacion.json").json();

export const tipoInput = Inputs.radio(["Mensual", "Interanual"], {
  value: "Mensual",
  label: "Tipo de inflación",
});

export const tipoSeleccionado = Generators.input(tipoInput);

export { periodoInput, periodoSeleccionado };

function mapDates(item) {
  return {
    ...item,
    fecha: new Date(item.fecha),
  };
}

export function inflacionChart({ tipo, periodo }, { width, height }) {
  const data = tipo === "Mensual" ? inflacion.mensual : inflacion.interanual;

  const collection = filtrarPorPeriodo(collect(data), periodo)
    .map(item => mapDates(item))
    .toArray();

  return Plot.plot({
    title: `Inflación ${tipo} en Argentina`,
    width,
    height: height - 50,
    y: { 
      grid: true, 
      label: "Porcentaje (%)",
      tickFormat: d => `${d}%`
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
        stroke: colors.indigo[500],
        strokeWidth: 2,
        tip: true,
      }),
      Plot.dot(collection, {
        x: "fecha",
        y: "valor",
        fill: colors.indigo[500],
        r: 3,
        tip: {
          format: {
            fecha: d => format(new Date(d), "dd/MM/yyyy"),
            valor: d => `${d.toFixed(2)}%`
          }
        }
      })
    ],
  });
}
