export default class Hashing {
	constructor(tam) {
		this.chart = new Array(tam);
		this.size = 0;
	}

	hash1(value) {
		return value % 19;
	}

	hash2(value) {
		return (value % 7) + 1;
	}

	get(key, remove = 0) {
		let index = key;
		let flag = 0,
			cont = 0;
		let aux;
		let val = 0;
		index = this.hash1(key);
		while (flag == 0) {
			if (index > this.tam) {
				index = this.hash1(key);
				cont = 0;
			} else {
				if (this.chart[index] != null && this.chart[index].id == key) {
					flag = 1;
					val = index;
				} else {
					cont += 1;
					index += cont * this.hash2(key);
				}
			}
		}
		aux = this.chart[index];
		if (remove == 1) {
			delete this.chart[index];
			this.size -= 1;
		}

		return [val, aux];
	}

	set(obj) {
		let key = obj.id;
		let index = key;
		let flag = 0,
			cont = 0;
		index = this.hash1(key);
		while (flag == 0) {
			if (index >= this.tam) {
				index = this.hash1(index);
				key = index;
				cont = 0;
			} else {
				if (this.chart[index] == null) {
					flag = 1;
				} else {
					cont += 1;
					index += cont * this.hash2(key);
				}
			}
		}
		this.chart[index] = obj;
		this.size += 1;
	}
}
