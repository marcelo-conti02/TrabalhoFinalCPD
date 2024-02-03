let cidades = [];
let query = prompt("Insira a info:");
async function fetchData(query) {
	return await fetch(
		`https://nominatim.openstreetmap.org/search?format=json&adressdetails=1&limit=40&q=${query}`
	).then((res) => res.json());
}
async function showData() {
	let data = await fetchData();
	cidades.push(...data);
	console.log(cidades);
}

showData();
