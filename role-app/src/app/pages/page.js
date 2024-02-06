"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showData, fetchData } from "../../../nav";

export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [placi, setPlaces] = useState(false);
	let i = 0;
	let newPlaces = [];
	const handleSearch = async (data) => {
		setSearchText(data.filterText);
		const places = await showData(searchText);
		setPlaces(places);
		for (i = 0; i < placi.length; i++) {
			newPlaces.push({ name: placi[i].name, type: placi[i].type });
		}
		try {
			console.log(JSON.stringify(newPlaces));
			const response = await fetch("http://localhost:3000/api", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPlaces),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error("Error submitting form:", error.message);
		}
	};
	if (placi) {
		return (
			<>
				<>
					<SearchForm
						setSearchText={setSearchText}
						handleSearch={handleSearch}
					/>
					<br />
				</>
				{placi.map((place) => {
					return (
						<>
							<div>
								<ul>
									<li>{place.name}</li>
									<li>{place.type}</li>
								</ul>
							</div>
						</>
					);
				})}
			</>
		);
	}

	return (
		<>
			<SearchForm setSearchText={setSearchText} handleSearch={handleSearch} />
			<br />
		</>
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
				<b>Pesquise um local:</b>
				<input
					type="text"
					placeholder="Digite algum local"
					required
					{...register("filterText")}
				/>

				<button type="submit">Search</button>
				<div className="container">{}</div>
			</form>
		</>
	);
}
