let cidades = [];

async function fetchData(query) {
	return await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&adressdetails=1&limit=40&q=${query}`
	).then((res) => res.json());
}
async function showData(searchText) {
	let data = await fetchData(searchText);
	cidades.push(...data);
	console.log(cidades);
}

export { showData };