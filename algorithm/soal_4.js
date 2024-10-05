// soal 4

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

function inputMatrix(matrix = []) {
  let leftDiagonal = 0;
  let rightDiagonal = 0;

  for (let x = 0; x < matrix.length; x++) {
    leftDiagonal += matrix[x][x];
    rightDiagonal += matrix[x][matrix.length - 1 - x];
  }

  return { leftDiagonal, rightDiagonal };
}

const { leftDiagonal, rightDiagonal } = inputMatrix(matrix);
console.log(`diagonal A: ${leftDiagonal}`);
console.log(`diagonal B: ${rightDiagonal}`);
console.log(`total: ${leftDiagonal - rightDiagonal}`);
