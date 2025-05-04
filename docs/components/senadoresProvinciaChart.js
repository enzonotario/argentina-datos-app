import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import colors from "npm:tailwind-colors";
import { FileAttachment } from "npm:@observablehq/stdlib";

const senadores = await FileAttachment("../data/senadores.json").json();

export function senadoresProvinciaChart({}, { width, height }) {
  const provinciasCount = collect(senadores)
    .groupBy('provincia')
    .map((grupo, provincia) => ({
      provincia,
      cantidad: grupo.count()
    }))
    .sortByDesc('cantidad')
    .toArray()[0];

    const data = Object.keys(provinciasCount).map((key) => {
      return {
        provincia: provinciasCount[key].provincia,
        cantidad: provinciasCount[key].cantidad
      };
    })

  return Plot.plot({
    title: "Distribución de Senadores por Provincia",
    width,
    height: height - 50,
    marginLeft: 150,
    x: {
      grid: true,
      label: "Cantidad de Senadores"
    },
    y: {
      label: null
    },
    marks: [
      Plot.barX(data, {
        y: "provincia",
        x: "cantidad",
        fill: colors.teal[500],
        sort: { y: "-x" },
        tip: true
      }),
      Plot.text(data, {
        y: "provincia",
        x: "cantidad",
        text: d => d.cantidad,
        dx: 10,
        fontSize: 14,
        fontWeight: "bold"
      })
    ]
  });
}