---
title: Diputados
---

# Diputados de Argentina

```js
import {diputadosPartidoChart} from './components/diputadosPartidoChart.js'
import {diputadosProvinciaChart} from './components/diputadosProvinciaChart.js'
import {diputadosMatrizChart} from './components/diputadosMatrizChart.js'
```

## Distribución por Partido Político

<div class="card">
  <div class="w-full h-100">
    ${resize((width, height) => diputadosPartidoChart({}, {width, height}))}
  </div>
</div>

## Distribución por Provincia

<div class="card">
  <div class="w-full h-150">
    ${resize((width, height) => diputadosProvinciaChart({}, {width, height}))}
  </div>
</div>

## Diputados por Provincia y Partido

<div class="card">
  <div class="w-full h-200">
    ${resize((width, height) => diputadosMatrizChart({}, {width, height}))}
  </div>
</div>