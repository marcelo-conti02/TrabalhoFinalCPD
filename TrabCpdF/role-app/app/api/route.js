import fs from "fs";
import Hashing from "../../../hash";
import all from "../bd/places.json";
import path from "path";
import favList from "../bd/favList.json";
// usamos path para evitar conflitos de caminho entre diferentes SOs

const universalPath = path.join(
	"../role-app",
	"src",
	"app",
	"bd",
	"places.json"
);
const universalPathFav = path.join(
	"../role-app",
	"src",
	"app",
	"bd",
	"favList.json"
);
export async function GET(request, res) {
	const data = all;
	data.all = data.all.filter((obj) => obj.name.trim() !== "");
	return Response.json({ data, favList });
}

export async function POST(request) {
	const newData = await request.json(); // assuming your request includes the updated data
	const existingData = all.all;
	const DataAdded = existingData.concat(newData); // Merge existing data with new data
	all.all = DataAdded;
	// Write back to the file
	//../role-app/src/app/bd/place.json
	fs.writeFileSync(universalPath, JSON.stringify(all));
	return new Response(JSON.stringify(newData), {
		headers: { "Content-Type": "application/json" },
		status: 201,
	});
}

export async function DELETE(request) {
	const newData = await request.json();

	const index = favList.fav_list.findIndex(
		(place) => place.id === parseInt(newData.id)
	);

	const delPlace = favList.fav_list[index];
	favList.fav_list.splice(index, 1);
	all.all[index] = delPlace;

	fs.writeFileSync(universalPath, JSON.stringify(all));
	fs.writeFileSync(universalPathFav, JSON.stringify(favList));

	return new Response(JSON.stringify({ text: "Tudo ok na remocao" }));
}

export async function PUT(request) {
	const newData = await request.json();

	const index = all.all.findIndex((place) => place.id === parseInt(newData.id));

	const UpPlace = all.all[index];
	all.all[index].fav = true;
	favList.fav_list.push(UpPlace);
	fs.writeFileSync(universalPath, JSON.stringify(all));
	fs.writeFileSync(universalPathFav, JSON.stringify(favList));
	return new Response(JSON.stringify({ text: "Tudo ok na att" }));
}
