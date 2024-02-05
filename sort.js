const fs = require('fs');

const jsonString = fs.readFileSync('places.json', 'utf-8');
const jsonData = JSON.parse(jsonString);

// exclui os objetos com name vazio e ordena por ordem alfabetica
jsonData.all = jsonData.all.filter(obj => obj.name.trim() !== '').sort((a, b) => a.name.localeCompare(b.name));


fs.writeFileSync('places.json', JSON.stringify(jsonData, null, 2));