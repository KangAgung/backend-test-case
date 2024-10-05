// Soal 3

const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];

function queryInArray(input = [], query = []) {
  const output = [];

  for (let x = 0; x < query.length; x++) {
    let counter = 0;
    for (let y = 0; y < input.length; y++) {
      if (query[x] == input[y]) {
        counter++;
      }
    }

    output.push(counter);
  }

  return output;
}

const output = queryInArray(input, query);
console.log(`Output: ${JSON.stringify(output)}`);
