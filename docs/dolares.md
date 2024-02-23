---
title: Dólares
---

# Cotizaciones del Dólar en Argentina

```js
import {chartHistorical, chartCandlestick, periodosInput, casasInput, casaInput, periodoSeleccionado, casasSeleccionadas, casaSeleccionada} from './components/chartDolares.js'
```

<div class="flex flex-col gap-4">
    <div>
        ${periodosInput}
    </div>
    <div class="grid grid-cols-2">
      <div class="card col-span-2">
        ${casasInput}
        <div class="w-full h-100">
          ${resize((width, height) => chartHistorical({periodo: periodoSeleccionado, casas: casasSeleccionadas}, {width, height}))}
        </div>
      </div>
      <div class="card col-span-2">
        ${casaInput}
        <div class="w-full h-100">
          ${resize((width, height) => chartCandlestick({periodo: periodoSeleccionado, casa: casaSeleccionada}, {width, height}))}
        </div>
      </div>
    </div>
</div>
