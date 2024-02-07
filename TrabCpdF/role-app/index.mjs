import file from "fs";
import { stringify } from "querystring";
let cidades = [];
import { showData, fetchData } from "./nav";

async function fetchDataFile() {
	return await fetch(
		"https://nominatim.openstreetmap.org/search?format=json&adressdetails=1&limit=40&q=Cafe in Porto Alegre"
	).then((res) => res.json());
}
async function showDataFile(data) {
	cidades.push(...data);
	let i = 0;
	file.appendFileSync("places.json", '{ "all": [', "utf-8");
	cidades.forEach((item) => {
		// { name: }
		i++;
		let placeInfo = {
			name: item.name,
			type: item.type,
			address: item.display_name,
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

export { showDataFile };
