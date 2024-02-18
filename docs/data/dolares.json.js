import { collect } from "collect.js";
import { format } from 'date-fns';

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return response.json();
}

const collection = collect(await json("https://api.argentinadatos.com/v1/cotizaciones/dolares"))

const casas = collection
    .pluck('casa')
    .unique()
    .all()

const dolares  = collection
    // .groupBy('casa')
    // .mapWithKeys((items, casa) => [casa, items])

    // .groupBy('fecha')
    // .map((items, fecha) => {
    //     return {
    //         fecha: fecha,
    //         ...casas.reduce((carry, casa) => {
    //             const item = items.firstWhere('casa', casa);
    //             return {
    //                 ...carry,
    //                 [casa]: item ? item.venta : null
    //             }
    //         }, {})
    //     }
    // })

    // .where('fecha', '>=', format(addYear(new Date(), -1), 'YYYY-MM-DD'))

    .values()

process.stdout.write(
    JSON.stringify(dolares)
);
