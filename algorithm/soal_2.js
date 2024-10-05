// Soal 2

const sentence = 'Saya sangat senang mengerjakan soal algoritma';

function longest(str = '') {
  const text = str.split(' ');
  let word = '';

  for (let x = 0; x < text.length; x++) {
    if (text[x].length > word.length) {
      word = text[x];
    }
  }

  return { word, length: word.length };
}

const { word, length } = longest(sentence);
console.log(`${word}: ${length} character`);
