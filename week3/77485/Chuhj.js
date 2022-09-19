function solution(rows, columns, queries) {
  let answer = [];

  let matrix = Array(rows)
    .fill()
    .map((v, rowIndex) =>
      Array(columns)
        .fill()
        .map((v, i) => rowIndex * columns + i + 1)
    );

  for (const query of queries) {
    let [y1, x1, y2, x2] = query.map((v) => v - 1);

    const rest = matrix[y1][x1];
    let min = rest;

    // up
    for (let y = y1 + 1; y <= y2; y++) {
      matrix[y - 1][x1] = matrix[y][x1];
      min = Math.min(min, matrix[y][x1]);
    }

    // left
    for (let x = x1 + 1; x <= x2; x++) {
      matrix[y2][x - 1] = matrix[y2][x];
      min = Math.min(min, matrix[y2][x]);
    }

    // down
    for (let y = y2 - 1; y >= y1; y--) {
      matrix[y + 1][x2] = matrix[y][x2];
      min = Math.min(min, matrix[y][x2]);
    }

    // right
    for (let x = x2 - 1; x > x1; x--) {
      matrix[y1][x + 1] = matrix[y1][x];
      min = Math.min(min, matrix[y1][x]);
    }

    matrix[y1][x1 + 1] = rest;
    answer.push(min);
  }

  return answer;
}

console.log(
  solution(6, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);

console.log(
  solution(3, 3, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
);

console.log(solution(100, 97, [[1, 1, 100, 97]]));
