import fs from "fs";
import { NextResponse } from "next/server";

export function GET(request, res) {
	const data = fs.readFileSync(
		"C:/Users/amain/Documents/TrabCpd/role-app/src/app/bd/places.json",
		"utf-8"
	);
	return new NextResponse(data);
}

export async function POST(request) {
	const newData = await request.json(); // assuming your request includes the updated data
	const filePath =
		"C:/Users/amain/Documents/TrabCpd/role-app/src/app/bd/places.json"; // Update the path to your JSON file

	// Read existing data
	const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
	existingData.push(newData);
	// Merge existing data with new data

	// Write back to the file
	fs.writeFileSync(filePath, JSON.stringify(existingData));
	return new Response(JSON.stringify(newData), {
		headers: { "Content-Type": "application/json" },
		status: 201,
	});
	// Respond with a JSON object
}
