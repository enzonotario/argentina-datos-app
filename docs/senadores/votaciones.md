---
title: Votaciones en el Senado
toc: false
---

# Votaciones en el Senado

```js
import {actaInput, actaSeleccionado, getSelectedActa} from '../components/actaInput.js'
import {senadoActasChart} from '../components/senadoActasChart.js'
import {senadoActasProvinciaChart} from '../components/senadoActasProvinciaChart.js'
import {senadoActasPartidoChart} from '../components/senadoActasPartidoChart.js'
import {senadoActasTable} from '../components/senadoActasTable.js'
import {senadoActasHeatmapChart} from '../components/senadoActasHeatmapChart.js'
import {senadoActasComparisonChart} from '../components/senadoActasComparisonChart.js'
import {VOTE_DISPLAY_NAMES, RESULTADO_DISPLAY_NAMES, RESULTADO_COLORS} from '../components/senadoActasUtils.js'
```

<div class="flex flex-col gap-4">
    <div class="xl:grid grid-cols-1 xl:grid-cols-3 gap-4 relative">
        <div class="relative">
            <div class="xl:sticky top-0">
                <div class="card">
                    <h3 class="text-lg font-semibold mb-2">Seleccionar Acta de Votación</h3>
                    ${actaInput}
                </div>
                <dl class="card flex flex-col gap-4">
                    <div class="flex flex-row gap-2">
                        <dt class="text-sm font-medium text-gray-700">Título</dt>
                        <dd class="text-sm text-gray-900">${actaSeleccionado['Título']}</dd>
                    </div>
                    <div class="flex flex-row gap-2">
                        <dt class="text-sm font-medium text-gray-700">Fecha</dt>
                        <dd class="text-sm text-gray-900">${actaSeleccionado['Fecha']}</dd>
                    </div>
                    <div class="flex flex-row gap-2">
                        <dt class="text-sm font-medium text-gray-700">Resultado</dt>
                        <dd class="text-sm">
                            <span class="px-2 py-1 rounded bg-black text-white font-bold">${RESULTADO_DISPLAY_NAMES[actaSeleccionado['Resultado']] || actaSeleccionado['Resultado']}</span>
                        </dd>
                    </div>
                </dl>
                <div class="card h-80">
                    ${resize((width, height) => senadoActasChart({ actaSeleccionado }, {width, height}))}
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4 col-span-2">
                <div class="card w-full h-150">
                    ${resize((width, height) => senadoActasProvinciaChart({ actaSeleccionado }, {width, height}))}
                </div>
                <div class="card w-full h-150">
                    ${resize((width, height) => senadoActasPartidoChart({ actaSeleccionado }, {width, height}))}
                </div>
                <div class="card w-full h-150">
                    ${resize((width, height) => senadoActasHeatmapChart({ actaSeleccionado }, {width, height}))}
                </div>
                <div class="card w-full h-150">
                    ${resize((width, height) => senadoActasComparisonChart({ actaSeleccionado }, {width, height}))}
                </div>
            </div>
        </div>
        <div class="card w-full space-y-2">
            <h2>Detalle de Votaciones</h2>
            <div class="w-full">
                ${senadoActasTable({ actaSeleccionado })}
            </div>
        </div>
    </div>
</div>
