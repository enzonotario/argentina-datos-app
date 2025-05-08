---
title: Senadores
---

# Senadores de Argentina

```js
import {senadoresPartidoChart} from '../components/senadoresPartidoChart.js'
import {senadoresProvinciaChart} from '../components/senadoresProvinciaChart.js'
import {senadoresMatrizChart} from '../components/senadoresMatrizChart.js'
```

# Distribución por Partido Político

<div class="card">
  <div class="w-full h-80">
    ${resize((width, height) => senadoresPartidoChart({}, {width, height}))}
  </div>
</div>

# Distribución por Provincia

<div class="card">
  <div class="w-full h-80">
    ${resize((width, height) => senadoresProvinciaChart({}, {width, height}))}
  </div>
</div>

# Senadores por Provincia y Partido

<div class="card">
  <div class="w-full h-200">
    ${resize((width, height) => senadoresMatrizChart({}, {width, height}))}
  </div>
</div>
