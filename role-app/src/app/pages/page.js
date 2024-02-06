"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
// import { showData, fetchData } from "../../../nav";
import axios from "axios";
export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [placi, setPlaces] = useState(false);
	const [fav, setfav] = useState([]);
	const [weather, setWeather] = useState(false);
	const [location, setLocation] = useState(false);

	let i = 0;
	let newPlaces = [];

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			getInfo(position.coords.latitude, position.coords.longitude);
			setLocation(true);
		});
	}, []);

	async function getInfo(lat, long) {
		const info = await axios.get(
			"https://api.openweathermap.org/data/2.5/weather",
			{
				params: {
					lat: lat,
					lon: long,
					appid: "391cc769a9a9cb8de5ad4e7e51086424",
					lang: "pt",
					units: "metric",
				},
			}
		);
		setWeather(info.data);
		console.log(info.data);
	}

	const handleSearch = async (data) => {
		setSearchText(data.filterText);
		// api version
		// const places = await showData(searchText);
		const response = await fetch("http://localhost:3000/api", {
			method: "GET",
		});
		const placesObj = await response.json();
		newPlaces.push(...placesObj.data.all);
		setPlaces(newPlaces);
		setfav([...placesObj.favList.fav_list]);
		// parte para encher o banco de dados
		// for (i = 0; i < placi.length; i++) {
		// 	newPlaces.push({
		// 		id: placi[i].place_id,
		// 		name: placi[i].name,
		// 		type: placi[i].type,
		//			fav: false,
		//			cep:
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

	if (location === false) {
		return (
			<>
				<h1>Você precisa habilitar a localização no browser o/</h1>
			</>
		);
	} else if (placi === false) {
		return (
			<main>
				<div className="container-title">
					<div>
						<h1>Carregando clima em:</h1>
						<SearchForm
							setSearchText={setSearchText}
							handleSearch={handleSearch}
						/>
					</div>
				</div>
			</main>
		);
	} else if (placi !== true) {
		const newPlaci = placi.filter(
			(obj) => obj.type === searchText.toLowerCase()
		);
		const temp = parseInt(weather["main"]["temp"]);
		return (
			<>
				<>
					<SearchForm
						setSearchText={setSearchText}
						handleSearch={handleSearch}
					/>
					<br />
					<div>
						<div>
							<h1>Clima em Porto Alegre</h1>
							{temp > 25 ? alert("tem certeza? Ta calor afu") : ""}
						</div>
						<h2>{weather["weather"][0]["description"]}</h2>
						<br />
						<ul>
							<li>Temperatura atual: {weather["main"]["temp"]}°</li>
							<li>Humidade: {weather["main"]["humidity"]}%</li>
							<li>Sensação térmica: {weather["main"]["feels_like"]}°</li>
							<li>Temperatura máxima: {weather["main"]["temp_max"]}°</li>
							<li>Temperatura minima: {weather["main"]["temp_min"]}°</li>
							<li>Pressão: {weather["main"]["pressure"]} hpa</li>
						</ul>
					</div>
					<br />
					<div>
						<h2>LISTA DE FAVORITOS</h2>
						{fav.length != 0
							? fav.map((place) => {
								return (
									<>
										<div>
											<ul>
												<li>{place.id}</li>
												<li>{place.name}</li>
												<li>{place.type}</li>
												<li>{place.fav ? "⭐" : ""}</li>
												<li>{place.address}</li>
												<br />
											</ul>
										</div>
									</>
								);
							})
							: ""}
					</div>
					<hr />
				</>
				{newPlaci.map((place) => {
					return (
						<>
							<div>
								<ul>
									<li>{place.id}</li>
									<li>{place.name}</li>
									<li>{place.type}</li>
									<li>{place.cep}</li>
									<br />
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
					<div className="pesquisa">
						<b>Pesquise um local:</b>
						<input
							type="text"
							placeholder="Digite algum local"
							required
							{...register("filterText")}
						/>

						<button type="submit">Search</button>
					</div>
					<div className="container-fav">
						<a href="../put">Adicionar aos favoritos</a>
						<a href="../del">Deletar item</a>
					</div>
				</form>
				<br />

				{/* <form onSubmit={handleSubmit(handleSearch)}>
				<b>Pesquise um tipo de local:</b>
				<input
					type="text"
					placeholder="Digite algum local"
					required
					{...register("filterText")}
				/>

				<button type="submit">Search</button>
				<div className="container">{}</div>
			</form> */}
			</>
		);
	}
}
