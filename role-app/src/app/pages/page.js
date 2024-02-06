"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { showData, fetchData } from "../../../nav";

export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [placi, setPlaces] = useState(false);
	let i = 0;
	let newPlaces = [];
	const handleSearch = async (data) => {
		setSearchText(data.filterText);
		// api version
		// const places = await showData(searchText);
		const response = await fetch("http://localhost:3000/api", {
			method: "GET",
		});
		const placesObj = await response.json();
		newPlaces.push(...placesObj.all);
		setPlaces(newPlaces);
		// parte para encher o banco de dados
		// for (i = 0; i < placi.length; i++) {
		// 	newPlaces.push({
		// 		id: placi[i].place_id,
		// 		name: placi[i].name,
		// 		type: placi[i].type,
		// 	});
		// }
		// 	try {
		// 		console.log(JSON.stringify(newPlaces));
		// 		const response = await fetch("http://localhost:3000/api", {
		// 			method: "POST",
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 			},
		// 			body: JSON.stringify(newPlaces),
		// 		});

		// 		if (!response.ok) {
		// 			throw new Error("Network response was not ok");
		// 		}

		// 		const result = await response.json();
		// 		console.log(result);
		// 	} catch (error) {
		// 		console.error("Error submitting form:", error.message);
		// 	}
	};

	if (placi) {
		const newPlaci = placi.filter(
			(obj) => obj.type === searchText.toLowerCase()
		);
		return (
			<>
				<>
					<SearchForm 
						setSearchText={setSearchText}
						handleSearch={handleSearch}
					/>
					<br />
				</>
				{newPlaci.map((place) => {
					return (
						<>
							<Place place={place}/>
						</>
					);
				})}
			</>
		);
	}

	return (
		<div className="home">
			<h1 className="title">Buscador de locais</h1>
			<SearchForm setSearchText={setSearchText} handleSearch={handleSearch} />
			<br />
		</div>
	);
}

function Place({place}){
	return (
		<ul>
			<li>{place.id}</li>
			<li>{place.name}</li>
			<li>{place.type}</li>
		</ul>			
	);
}

function SearchForm({ handleSearch }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitted },
	} = useForm({ defaultValues: { filterText: "" } });

	if (isSubmitted) {
		reset();
	}

	return (
		<>
			<form onSubmit={handleSubmit(handleSearch)}>
				<b>Pesquise um tipo de local:</b>
				<div className="input">
					<input
						type="text"
						placeholder="Digite algum local"
						required
						{...register("filterText")}
					/>
					<button type="submit">Search</button>
				</div>
				<div className="container">{}</div>
			</form>
		</>
	);
}
