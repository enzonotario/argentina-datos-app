import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import colors from "npm:tailwind-colors";
import { FileAttachment } from "npm:@observablehq/stdlib";
import * as Inputs from "npm:@observablehq/inputs";

const senadores = await FileAttachment("../data/senadores.json").json();

export function senadoresPartidoChart({}, { width, height }) {
  const partidosCount = collect(senadores)
    .groupBy('partido')
    .map((grupo, partido) => ({
      partido,
      cantidad: grupo.count()
    }))
    .sortByDesc('cantidad')
    .toArray()[0];

  const data = Object.keys(partidosCount).map((key) => {
    return {
      partido: partidosCount[key].partido,
      cantidad: partidosCount[key].cantidad
    };
  })

  const partidosColors = [
    colors.blue[500],
    colors.yellow[500],
    colors.red[500],
    colors.green[500],
    colors.purple[500],
    colors.orange[500],
    colors.pink[500],
    colors.indigo[500],
    colors.gray[500]
  ];

  return Plot.plot({
    title: "Distribución de Senadores por Partido Político",
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
        y: "partido",
        x: "cantidad",
        fill: (d, i) => partidosColors[i % partidosColors.length],
        sort: { y: "-x" },
        tip: true
      }),
      Plot.text(data, {
        y: "partido",
        x: "cantidad",
        text: d => d.cantidad,
        dx: 10,
        fontSize: 14,
        fontWeight: "bold"
      })
    ]
  });
}