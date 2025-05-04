import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import colors from "npm:tailwind-colors";
import { FileAttachment } from "npm:@observablehq/stdlib";

const diputados = await FileAttachment("../data/diputados.json").json();

export function diputadosMatrizChart({}, { width, height }) {
  const provincias = [...new Set(diputados.map(d => d.provincia))].sort();
  const partidos = [...new Set(diputados.map(d => d.bloque))].sort();
  
  const matrixData = [];
  
  const diputadosByProvinciaAndPartido = collect(diputados)
    .groupBy('provincia')
    .map((provinciaGroup, provincia) => {
      const partidoGroups = collect(provinciaGroup.items)
        .groupBy('bloque')
        .map((partidoGroup, partido) => {
          matrixData.push({
            provincia,
            partido,
            cantidad: partidoGroup.count()
          });

          return {
            partido,
            cantidad: partidoGroup.count()
          };
        });

      return {
        provincia,
        partidos: partidoGroups.toArray()
      };
    });
  
  const maxCount = Math.max(...matrixData.map(d => d.cantidad));
  
  return Plot.plot({
    title: "Diputados por Provincia y Partido",
    width,
    height: height - 50,
    marginLeft: 150,
    marginBottom: 100,
    x: {
      label: "Partido Político",
      tickRotate: -45,
      domain: partidos
    },
    y: {
      label: "Provincia",
      domain: provincias
    },
    color: {
      type: "linear",
      scheme: "blues",
      legend: true,
      label: "Cantidad de Diputados"
    },
    marks: [
      Plot.cell(matrixData, {
        x: "partido",
        y: "provincia",
        fill: "cantidad",
        tip: true
      }),
      Plot.text(matrixData, {
        x: "partido",
        y: "provincia",
        text: d => d.cantidad > 0 ? d.cantidad : "",
        fill: d => d.cantidad > maxCount / 2 ? "white" : "black",
        fontWeight: "bold"
      })
    ]
  });
}