import fs from "fs";
import { NextResponse } from "next/server";
import all from "../bd/places.json";
import path from "path";
// usamos path para evitar conflitos de caminho entre diferentes SOs
const universalPath = path.join(
	"../role-app",
	"src",
	"app",
	"bd",
	"places.json"
);
export async function GET(request, res) {
	const data = all;
	return Response.json(data);
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
	console.log(newData);
	const index = all.all.findIndex((place) => place.id === parseInt(newData.id));

	const delPlace = all.all[index];
	all.all.splice(index, 1);
	fs.writeFileSync(universalPath, JSON.stringify(all));

	return new Response(JSON.stringify({ text: "Tudo ok na remocao" }));
}

export async function PUT(request) {
	const newData = await request.json();

	const index = all.all.findIndex((place) => place.id === parseInt(newData.id));

	const UpPlace = all.all[index];
	all.all[index] = { id: 0, name: UpPlace.name, type: UpPlace.type };
	fs.writeFileSync(universalPath, JSON.stringify(all));
	return new Response(JSON.stringify({ text: "Tudo ok na att" }));
}
