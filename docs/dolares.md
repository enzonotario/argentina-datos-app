---
title: Dólares
---

# Cotizaciones del Dólar en Argentina

El siguiente gráfico muestra la cotización del dólar en Argentina a lo largo del tiempo.

```js
const dolares = (await FileAttachment("./data/dolares.json").json())
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


function chartDolares({dolares}, {width}) {
  return Plot.plot({
    title: "Cotizaciones del Dólar en Argentina",
    width,
    height: 300,
    y: {grid: true, label: "Cotización"},
    marks: [
      Plot.line(
          collect(dolares)
              .when(periodoSeleccionado !== 'Todo', collection => collection.where('fecha', '>=', format(subDays(new Date(), periodos[periodoSeleccionado]), 'yyyy-MM-dd')))
              .map(item => mapDates(item))
              .toArray(),
          {x: "fecha", y: "venta", stroke: "casa", tip: "x"}),
    ],
        
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => chartDolares({dolares}, {width}))}
  </div>
</div>
