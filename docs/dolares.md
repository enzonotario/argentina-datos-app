---
title: Dólares
---

# Cotizaciones del Dólar en Argentina

```js
import colors from 'npm:tailwind-colors'
console.log({colors})
```

```js
const dolares = (await FileAttachment("./data/dolares.json").json())
```

```js
const candlesticksPorCasa = (await FileAttachment("./data/dolaresCandlestick.json").json())
```

```js
const periodos = {
    '1 semana': 7,
    '1 mes': 30,
    '1 año': 365,
    '5 años': 1825,
    'Todo': 'todo'
}

const periodoSeleccionado = view(Inputs.radio(Object.keys(periodos), {value: '1 mes', label: "Periodo"}))

const casaInput = Inputs.radio(Object.keys(candlesticksPorCasa), {value: 'blue', label: "Casa"})

const casaSeleccionada = Generators.input(casaInput)

const casasInput = Inputs.checkbox(Object.keys(candlesticksPorCasa), {
    value: ['oficial', 'blue', 'contadoconliqui', 'bolsa'], 
    label: "Casas"
})

const casasSeleccionadas = Generators.input(casasInput)
```

```js
import { collect } from 'npm:collect.js'
import { subDays, format } from 'npm:date-fns'

function mapDates(item) {
    return {
        ...item,
        fecha: new Date(item.fecha)
    }
}

function chartHistorical({dolares}, {width}) {
    const collection = collect(dolares)
        .when(periodoSeleccionado !== 'Todo', collection => collection.where('fecha', '>=', format(subDays(new Date(), periodos[periodoSeleccionado]), 'yyyy-MM-dd')))
        .whereIn('casa', casasSeleccionadas)
        .map(item => mapDates(item))
    
  return Plot.plot({
    title: "Cotizaciones del Dólar en Argentina",
    width,
    height: 300,
    y: {grid: true, label: "Cotización"},
    marks: [
      Plot.line(
        collection.toArray(),
        {x: "fecha", y: "venta", stroke: "casa", tip: "x"}
      ),
    ],
  });
}
```

```js

function chartCandlestick({casa}, {width}) {
    const collection = collect(casa && casa.candlesticks || [])
        .when(periodoSeleccionado !== 'Todo', collection => collection.where('fecha', '>=', format(subDays(new Date(), periodos[periodoSeleccionado]), 'yyyy-MM-dd')))
        .map(item => mapDates(item))
        .dump()
    
    return Plot.plot({
        title: "Evolución del Dólar",
        inset: 6,
        width,
        grid: true,
        y: {label: "Cotización"},
        color: {domain: [-1, 0, 1], range: [colors.pink[500], colors.gray[900], colors.indigo[500]]},
        marks: [
            Plot.ruleX(collection.toArray(), {
                x: "fecha",
                y1: "apertura",
                y2: "cierre",
            }),
            Plot.ruleX(collection.toArray(), {
                x: "fecha",
                y1: "apertura",
                y2: "cierre",
                stroke: (d) => Math.sign(d.cierre - d.apertura),
                strokeWidth: 4,
                strokeLinecap: "round",
            }),
            Plot.line(collection.toArray(), {
                x: "fecha",
                y: "cierre",
                tip: "x",
                stroke: colors.indigo[300],
            }),
        ]
    })
}
```

<div class="grid grid-cols-2">
  <div class="card col-span-2">
    ${casasInput}
    ${resize((width) => chartHistorical({dolares}, {width}))}
  </div>

  <div class="card col-span-2">
    ${casaInput}
    ${resize((width) => chartCandlestick({casa: candlesticksPorCasa[casaSeleccionada]}, {width}))}
  </div>
</div>
