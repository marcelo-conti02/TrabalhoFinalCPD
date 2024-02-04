"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showData, fetchData } from "../../../nav";

export default function Home() {
	const [searchText, setSearchText] = useState("");

	const handleSearch = async (data) => {
		setSearchText(data.filterText);
		const places = await showData(searchText);
		return places;
	};

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