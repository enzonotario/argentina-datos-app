import { config } from 'dotenv';

config();

// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: 'Argentina Datos',

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    // {
    //   name: "Examples",
    //   pages: [
    //     {name: "Dashboard", path: "/example-dashboard"},
    //     {name: "Report", path: "/example-report"}
    //   ]
    // }

    {
      name: 'Economía/Finanzas',
      pages: [
        { name: 'Dólares', path: '/dolares' },
        { name: 'Economía', path: '/economia' },
      ],
    },
    {
      name: 'Política',
      pages: [{ name: 'Diputados', path: '/diputados' }],
    },
    {
      name: 'Senadores',
      pages: [
        { name: 'Composición', path: '/senadores/composicion' },
        { name: 'Votaciones', path: '/senadores/votaciones' },
      ],
    },
  ],

  head: `<script async src="https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}"></script>
<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.GTAG_ID}');</script>
<script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
`,

  header: `<div class="flex items-center gap-2 p-2 font-sans font-semibold text-sm" style="border-bottom: 1px solid #e2e8f0;">
    <a href="/" class="flex items-center gap-2 text-gray-800!" aria-label="Argentina Datos" title="Argentina Datos">
      <img src="https://argentinadatos.com/assets/logo.png" class="w-8 h-8 rounded" alt="Argentina Datos" width="32" height="32">
      <span>Argentina Datos</span>
    </a>
    <div class="flex-grow flex justify-end items-center text-xs">
      <a href="https://github.com/enzonotario/argentina-datos-app" class="text-gray-600!" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub"><span>GitHub</span></a>
    </div>
  </div>`,

  // Some additional configuration options and their defaults:
  theme: ['light', 'alt', 'wide'], // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer:
    "Hecho con <a href='https://observablehq.com/'>Observable</a>. Fuente: <a href='https://argentinadatos.com/'>ArgentinaDatos</a>.", // what to show in the footer (HTML)
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // root: "docs", // path to the source root for preview
  // output: "dist", // path to the output root for build
};
