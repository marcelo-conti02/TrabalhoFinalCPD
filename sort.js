const fs = require('fs');

const jsonString = fs.readFileSync('places.json', 'utf-8');
const jsonData = JSON.parse(jsonString);

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

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        const key = array[i];
        const index = binarySearch(array, key.name, 0, i - 1);
        for (let j = i; j > index; j--) {
            array[j] = array[j - 1];
        }
        array[index] = key;
    }
}

// Filtra objetos com 'name' vazio e ordena
jsonData.all = jsonData.all.filter(obj => obj.name.trim() !== '');
insertionSort(jsonData.all);

// Reescreve o arquivo ordenado
fs.writeFileSync('places.json', JSON.stringify(jsonData, null, 2));