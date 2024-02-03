import file from "node:fs";
import { stringify } from "node:querystring";
let cidades = [];

async function fetchData() {
	return await fetch(
		"https://nominatim.openstreetmap.org/search?format=json&adressdetails=1&limit=40&q=Cafe in Porto Alegre"
	).then((res) => res.json());
}
async function showData() {
	let data = await fetchData();
	cidades.push(...data);
	let i = 0;
	let aux
	if (!file.existsSync("places.json"))
		file.writeFileSync("places.json", '{ "all": [', "utf-8");
	else {
		removeLastCharacters();
		file.appendFileSync("places.json", ', ', "utf-8");
	}

	cidades.forEach((item) => {
		// { name: }
		aux = formatString(item.display_name)
		i++;
		let placeInfo = {
			name: item.name,
			type: item.type,
			address: aux[0],
			cep: aux[1]
		};
		// json.writeFile(
		// 	"place.json",
		// 	"name : " + name + " type :" + type + " address :" + address
		// );
		file.appendFileSync("places.json", JSON.stringify(placeInfo), "utf-8");
		if (i != cidades.length) {
			file.appendFileSync("places.json", ",", "utf-8");
		} else {
			file.appendFileSync("places.json", "]}", "utf-8");
		}
	});
}

function formatString(item) {
	let cep = '';
	let virg = 0
	let address = ''
	let aux = ''
	let v, i
	let flag = 0
	for (v in item) {
		if (virg >= 1 && virg < 4) {
			aux = aux + item[v]
		}

		if (item[v] == ',') {
			address = address + aux
			if (aux.replace('-', '').replace(',', '').replace(' ', '').match(/^[0-9]+$/) == null)
				virg += 1
			else {
				flag = 1
			}
			aux = ''
		}
	}
	let point = virg;
	if (flag == 1)
		point += 1
	virg = 0
	for (i in item) {
		if (virg >= point - 1 && virg < point) {
			if (item[i] != ',' && item[i] != ' ') {
				cep = cep + item[i]
			}
		}
		if (item[i] == ',')
			virg += 1;
	}

	return [address.substring(1, address.length - 1), cep];
}

function removeLastCharacters() {
	var data = file.readFileSync('places.json', 'utf-8');
	data = String(data);
	var newValue = data.slice(0, data.length - 10);

	file.writeFileSync('places.json', newValue, 'utf-8');

}



showData();
