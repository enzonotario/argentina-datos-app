async function request(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
	return response.json();
}

const dolares = await request(
	"https://api.argentinadatos.com/v1/cotizaciones/dolares",
);

process.stdout.write(JSON.stringify(dolares));
