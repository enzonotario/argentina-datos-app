import { collect } from "collect.js";
import { useApi } from "./useApi.js";

const collection = collect(
	await useApi().fetchJson("/v1/cotizaciones/dolares"),
);

const candlesticksPorCasa = collection.groupBy("casa").map((dolares) => {
	const candlesticks = dolares.map((dolar, index) => {
		const dolarAnterior = dolares.get(index - 1);

		return {
			fecha: dolar.fecha,
			apertura: dolarAnterior?.venta || dolar.venta,
			cierre: dolar.venta,
			minimo: dolares.min("venta"),
			maximo: dolares.max("venta"),
		};
	});

	return {
		casa: dolares.first().casa,
		candlesticks,
	};
});

process.stdout.write(JSON.stringify(candlesticksPorCasa));
