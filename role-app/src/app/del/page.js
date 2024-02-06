"use client";

import { useState } from "react";

const HomePage = () => {
	const [formData, setFormData] = useState({
		// Initialize with your desired properties
	});

	const handleInputChange = (e) => {
		setFormData({
			name: e.target.value,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log(formData.name);
			const response = await fetch(`http://localhost:3000/api`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id: formData.name }),
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

	return (
		<div className="container">
			<form onSubmit={handleFormSubmit}>
				<label>
					Insira o id do elemento a ser deletado:
					<input
						type="text"
						name="exampleData"
						value={formData.exampleData}
						onChange={handleInputChange}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default HomePage;
