---
toc: false
---

<div class="flex flex-col items-center justify-center text-center space-y-6 py-8">
  <h1 class="text-6xl font-bold">Argentina Datos</h1>
  <h2 class="text-2xl font-semibold not-italic">Visualizaciones de datos de Argentina</h2>
  <p class="text-gray-600">
    Explora los datos de Argentina a través de visualizaciones interactivas.
    <br>
    Puedes colaborar en <a href="https://github.com/enzonotario/argentina-datos-app" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" title="GitHub">GitHub</a>.
  </p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <a href="/dolares" class="flex flex-col card hover:shadow-lg transition-shadow">
    <h2 class="text-xl font-bold">Dólares</h2>
    <p class="text-gray-600">Visualización de cotizaciones del dólar en Argentina</p>
  </a>
  <a href="/economia" class="flex flex-col card hover:shadow-lg transition-shadow">
    <h2 class="text-xl font-bold">Indicadores Económicos</h2>
    <p class="text-gray-600">Dashboard de inflación y otros indicadores económicos</p>
  </a>
  <a href="/diputados" class="flex flex-col card hover:shadow-lg transition-shadow">
    <h2 class="text-xl font-bold">Diputados</h2>
    <p class="text-gray-600">Visualizaciones sobre la composición de la Cámara de Diputados de la Nación</p>
  </a>
  <a href="/senadores" class="flex flex-col card hover:shadow-lg transition-shadow">
    <h2 class="text-xl font-bold">Senadores</h2>
    <p class="text-gray-600">Visualizaciones sobre la composición del Senado de la Nación</p>
  </a>
</div>

[//]: # (<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">)

[//]: # (  <div class="card">${)

[//]: # (    resize&#40;&#40;width&#41; => Plot.plot&#40;{)

[//]: # (      title: "Brecha cambiaria",)

[//]: # (      subtitle: "Dólar oficial vs. Dólar informal en los últimos 5 años",)

[//]: # (      width,)

[//]: # (      y: {grid: true, label: "Brecha cambiaria"},)

[//]: # (      marks: [)

[//]: # (        Plot.ruleY&#40;[0]&#41;,)

[//]: # (        Plot.lineY&#40;dolares, {x: "fecha", y: "venta", stroke: "casa", tip: true}&#41;,)

[//]: # (        Plot.rectY&#40;brechaCambiariaPorDia, {x: "fecha", y: "brecha", strokeWidth: 1}&#41;)

[//]: # (      ])

[//]: # (    }&#41;&#41;)

[//]: # (  }</div>)

[//]: # (  <div class="card">${)

[//]: # (    resize&#40;&#40;width&#41; => Plot.plot&#40;{)

[//]: # (      title: "How big are penguins, anyway? 🐧",)

[//]: # (      width,)

[//]: # (      grid: true,)

[//]: # (      x: {label: "Body mass &#40;g&#41;"},)

[//]: # (      y: {label: "Flipper length &#40;mm&#41;"},)

[//]: # (      color: {legend: true},)

[//]: # (      marks: [)

[//]: # (        Plot.linearRegressionY&#40;penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species"}&#41;,)

[//]: # (        Plot.dot&#40;penguins, {x: "body_mass_g", y: "flipper_length_mm", stroke: "species", tip: true}&#41;)

[//]: # (      ])

[//]: # (    }&#41;&#41;)

[//]: # (  }</div>)

[//]: # (</div>)

---
