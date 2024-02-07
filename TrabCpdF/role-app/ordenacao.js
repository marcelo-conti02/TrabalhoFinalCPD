//optamos por insertion-sort com busca binaria para o algoritmo ser economico na memoria e com
// busca binaria ainda tendo um comportamento assintotico aceitavel

function binarySearch(array, key, start, end) {
	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		if (array[mid].name < key) {
			start = mid + 1;
		} else if (array[mid].name > key) {
			end = mid - 1;
		} else {
			return mid;
		}
	}
	return start;
}

export function insertionSort(array) {
	for (let i = 1; i < array.length; i++) {
		const key = array[i];
		const index = binarySearch(array, key.name, 0, i - 1);
		for (let j = i; j > index; j--) {
			array[j] = array[j - 1];
		}
		array[index] = key;
	}
}

function binarySearchDescending(array, key, start, end) {
	while (start <= end) {
		const mid = Math.floor((start + end) / 2);
		if (array[mid].name > key) {
			// Change the comparison to '>'
			start = mid + 1;
		} else if (array[mid].name < key) {
			// Change the comparison to '<'
			end = mid - 1;
		} else {
			return mid;
		}
	}
	return start;
}

export function insertionSortDescending(array) {
	for (let i = 1; i < array.length; i++) {
		const key = array[i];
		const index = binarySearchDescending(array, key.name, 0, i - 1);
		for (let j = i; j > index; j--) {
			array[j] = array[j - 1];
		}
		array[index] = key;
	}
}

// Filtra objetos com 'name' vazio e ordena
// jsonData.all = jsonData.all.filter((obj) => obj.name.trim() !== "");
