// Soal 1
const text = 'negie1';

function reverse(str = '') {
  let text = '';
  let number = '';

  for (let x = 0; x < str.length; x++) {
    if (isNaN(str[x])) {
      text = str[x] + text;
    } else {
      number += str[x];
    }
  }

  return text + number;
}

const newText = reverse(text);
console.log(newText);
