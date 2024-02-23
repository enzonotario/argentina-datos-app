import * as Plot from "npm:@observablehq/plot";
import { collect } from "npm:collect.js";
import { format, subDays } from "npm:date-fns";
import colors from "npm:tailwind-colors";
import { Generators, FileAttachment } from "npm:@observablehq/stdlib";
import * as Inputs from "npm:@observablehq/inputs";

const dolares = await FileAttachment("../data/dolares.json").json();

const candlesticks = await FileAttachment(
	"../data/dolaresCandlestick.json",
).json();

const periodos = {
	"1 semana": 7,
	"1 mes": 30,
	"1 año": 365,
	"5 años": 1825,
	Todo: "Todo",
};

export const periodosInput = Inputs.radio(Object.keys(periodos), {
	value: "1 mes",
	label: "Periodo",
});

export const periodoSeleccionado = Generators.input(periodosInput);

export const casaInput = Inputs.radio(Object.keys(candlesticks), {
	value: "blue",
	label: "Casa",
});

export const casaSeleccionada = Generators.input(casaInput);

export const casasInput = Inputs.checkbox(Object.keys(candlesticks), {
	value: ["oficial", "blue", "contadoconliqui", "bolsa"],
	label: "Casas",
});

export const casasSeleccionadas = Generators.input(casasInput);

function mapDates(item) {
	return {
		...item,
		fecha: new Date(item.fecha),
	};
}

export function chartHistorical({ periodo, casas }, { width, height }) {
	const collection = collect(dolares)
		.when(periodo !== "Todo", (collection) =>
			collection.where(
				"fecha",
				">=",
				format(subDays(new Date(), periodos[periodo]), "yyyy-MM-dd"),
			),
		)
		.whereIn("casa", casas)
		.map((item) => mapDates(item))
		.toArray();

	return Plot.plot({
		title: "Cotizaciones del Dólar en Argentina",
		width,
		height: height - 50,
		y: { grid: true, label: "Cotización" },
		marks: [
			Plot.line(collection, {
				x: "fecha",
				y: "venta",
				stroke: "casa",
				tip: "x",
			}),
		],
	});
}

export function chartCandlestick({ periodo, casa }, { width, height }) {
	const candlestickPorCasa = candlesticks[casa];

	const collection = collect(candlestickPorCasa?.candlesticks || [])
		.when(periodo !== "Todo", (collection) =>
			collection.where(
				"fecha",
				">=",
				format(subDays(new Date(), periodos[periodo]), "yyyy-MM-dd"),
			),
		)
		.map((item) => mapDates(item))
		.toArray();

	return Plot.plot({
		title: "Evolución del Dólar",
		inset: 6,
		width,
		height: height - 50,
		grid: true,
		y: { label: "Cotización" },
		color: {
			domain: [-1, 0, 1],
			range: [colors.pink[500], colors.gray[900], colors.indigo[500]],
		},
		marks: [
			Plot.ruleX(collection, {
				x: "fecha",
				y1: "apertura",
				y2: "cierre",
			}),
			Plot.ruleX(collection, {
				x: "fecha",
				y1: "apertura",
				y2: "cierre",
				stroke: (d) => Math.sign(d.cierre - d.apertura),
				strokeWidth: 4,
				strokeLinecap: "round",
			}),
			Plot.line(collection, {
				x: "fecha",
				y: "cierre",
				tip: "x",
				stroke: colors.indigo[300],
			}),
		],
	});
}
