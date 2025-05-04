---
title: Indicadores Económicos
---

# Dashboard de Indicadores Económicos

```js
import {periodoInput, periodoSeleccionado} from './components/periodoInput.js'
import {inflacionChart, tipoInput, tipoSeleccionado} from './components/inflacionChart.js'
import {riesgoPaisChart} from './components/riesgoPaisChart.js'
import {indicadoresUVA} from './components/indicadoresUVA.js'
import {tasasChart, tipoTasaInput, tipoTasaSeleccionado} from './components/tasasChart.js'
```

## Inflación en Argentina

<div class="flex flex-col gap-4">
  <div class="grid grid-cols-2">
    <div>
      ${tipoInput}
    </div>
    <div>
      ${periodoInput}
    </div>
  </div>

  <div class="card">
    <div class="w-full h-80">
      ${resize((width, height) => inflacionChart({tipo: tipoSeleccionado, periodo: periodoSeleccionado}, {width, height}))}
    </div>
  </div>
</div>

## Evolución del Riesgo País

<div class="flex flex-col gap-4">
  <div>
    ${periodoInput}
  </div>

  <div class="card">
    <div class="w-full h-150">
      ${resize((width, height) => riesgoPaisChart({periodo: periodoSeleccionado}, {width, height}))}
    </div>
  </div>
</div>

## Valor de UVA

<div class="flex flex-col gap-4">
  <div>
    ${periodoInput}
  </div>

  <div class="card">
    <div class="w-full h-150">
      ${resize((width, height) => indicadoresUVA({periodo: periodoSeleccionado}, {width, height}))}
    </div>
  </div>
</div>

## Rendimiento de Plazos Fijos

<div class="flex flex-col gap-4">
  <div>
    ${tipoTasaInput}
  </div>

  <div class="card">
    <div class="w-full h-150">
      ${resize((width, height) => tasasChart({tipo: tipoTasaSeleccionado}, {width, height}))}
    </div>
  </div>
</div>
