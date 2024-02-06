class Hashing {
  constructor(tam) {
    this.chart = new Array(tam);
    this.size = 0;
  }


  hash1(value) {
    return (value % 19);
  }

  hash2(value) {
    return (value % 7) + 1;
  }

  get(key, remove = 0) {
    let index = key
    let flag = 0, cont = 0
    let aux
    index = this.hash1(index)
    while (flag == 0) {
      if (index >= this.tam) {
        index = this.hash1(index)
        cont = 0
      }

      else {
        if (this.chart[index].id == key)
          flag = 1
        else {
          cont += 1
          index = cont * this.hash2(index)
        }
      }
    }
    aux = this.chart[index];
    if (remove == 1) {
      delete (this.chart[index])
      this.size -= 1;
    }

    return aux
  }

  set(obj) {
    let key = obj.id;
    let flag = 0, cont = 0;
    key = this.hash1(key)
    while (flag == 0) {
      if (key >= this.tam) {
        key = this.hash1(key)
        cont = 0
      }

      else {
        if (this.chart[key] == null) {
          flag = 1
        }
        else {
          cont += 1;
          key += cont * this.hash2(key)
        }
      }
    }
    this.chart[key] = obj
    this.size += 1

  }
}



// let tabela = new Hashing(50);

// let all = [

//   { "id": 1, "name": "Saúde no Copo Bom Fim", "type": "cafe" },
//   { "id": 20, "name": "Cafeteria Cheirin Bão Bom", "type": "cafe" },
// ]
// let i = 0

// for (i in all)
//   tabela.set(all[i])
