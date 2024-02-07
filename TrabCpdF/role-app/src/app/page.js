"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
import { insertionSort, insertionSortDescending } from "../../ordenacao.js";
// import { showData, fetchData } from "../../../nav";
import axios from "axios";
export default function Home() {
	const [searchText, setSearchText] = useState("");
	const [placi, setPlaces] = useState(false);
	const [fav, setfav] = useState([]);
	const [weather, setWeather] = useState(false);
	const [location, setLocation] = useState(false);
	const [sortOrder, setSortOrder] = useState(1);

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
				<div className="container">
					<div>
						<SearchForm
							setSearchText={setSearchText}
							handleSearch={handleSearch}
						/>
					</div>
				</div>
			</main>
		);
	} else if (placi !== true) {
		let newPlaci = [];
		let uniqueArray = [];
		if (searchText !== "*") {
			newPlaci = placi.filter((obj) => obj.type === searchText.toLowerCase());
			uniqueArray = removeDuplicates(newPlaci, (obj) => obj.id);
		} else {
			uniqueArray = removeDuplicates(placi, (obj) => obj.id);
		}

		// Example: Remove duplicates based on the 'id' property

		insertionSort(uniqueArray);
		// insertionSortDescending(uniqueArray);
		const temp = parseInt(weather["main"]["temp"]);

		return (
			<>
				<>
					<SearchForm
						setSearchText={setSearchText}
						handleSearch={handleSearch}
					/>
					<br />
					<div className="containerFavWea">
						<div>
							<h1>Clima em Porto Alegre:</h1>
							<h2>{weather["weather"][0]["description"]}</h2>
							{temp > 30 ? alert("tem certeza? Ta calor afu") : ""}

							<br />
							<ul>
								<li>Temperatura atual: {weather["main"]["temp"]}°</li>
								<li>Sensação térmica: {weather["main"]["feels_like"]}°</li>
								<li>Temperatura máxima: {weather["main"]["temp_max"]}°</li>
								<li>Temperatura minima: {weather["main"]["temp_min"]}°</li>
							</ul>
						</div>
						<br />
						<div>
							<h2>LISTA DE FAVORITOS</h2>
							{fav.length != 0
								? fav.map((place) => {
										return (
											<>
												<ul>
													<li>
														{place.fav ? "⭐" : ""}
														Id: {place.id}
													</li>
													<li>Nome: {place.name}</li>
													<li>Tipo: {place.type}</li>

													<li>Endereço: {place.address}</li>
													<br />
												</ul>
											</>
										);
								  })
								: ""}
						</div>
					</div>
					<hr />
				</>
				<button onCliCk={(e) => HandleSort(uniqueArray, 1)}>A-Z</button>
				<button onClick={(e) => HandleSort(uniqueArray, 0)}>Z-A</button>
				<div className="rows">
					{uniqueArray.map((place) => {
						return (
							<>
								<div>
									<ul>
										<li>Id: {place.id}</li>
										<li>Nome: {place.name}</li>
										<li>Tipo: {place.type}</li>
										<li>CEP: {place.cep}</li>
										<br />
									</ul>
								</div>
							</>
						);
					})}
				</div>
			</>
		);
	}

	return (
		<>
			<SearchForm setSearchText={setSearchText} handleSearch={handleSearch} />
			<br />
		</>
	);

	function HandleSort(array, method) {
		if (method === 1) {
			insertionSort(array);
		} else {
			insertionSortDescending(array);
		}
		setSortOrder(method);
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
					<div className="formContainer">
						<label>Pesquise Algo</label>
						<input
							type="text"
							placeholder="Digite algum local"
							required
							{...register("filterText")}
						/>

						<button type="submit">Search</button>
					</div>
					<br />
					<p>Tipos de pesquisa: cafe, hospital, pub, bar, restaurant</p>
					<br />
					<p>Digite * se não quiser filtrar</p>
					<div className="container">
						<br />
						<a className="link" href="../put">
							Adicionar aos favoritos
						</a>
						<a className="link" href="../del">
							Deletar item dos favoritos
						</a>
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
function removeDuplicates(array, identifier) {
	const seen = new Set();
	return array.filter((obj) => {
		const key = identifier(obj);
		if (!seen.has(key)) {
			seen.add(key);
			return true;
		}
		return false;
	});
}
