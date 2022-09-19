function solution(rows, columns, queries) {
  let answer = [];
  let board = Array.from(Array(rows), () => new Array(columns));
  let newBoard = Array.from(Array(rows), () => Array(columns).fill(0));
  let num = 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      board[i][j] = num;
      num++;
    }
  }

  queries.forEach((query) => {
    let [x1, y1, x2, y2] = query;
    x1 -= 1;
    y1 -= 1;
    x2 -= 1;
    y2 -= 1;
    let min = 1000000;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // 오른쪽으로 밀리는 경우
        if (i === x1 && j >= y1 && j <= y2) {
          if (j === y1) {
            newBoard[i][j] = board[i + 1][j];
          } else {
            newBoard[i][j] = board[i][j - 1];
          }
          if (newBoard[i][j] < min) {
            min = newBoard[i][j];
          }
        }

        // 왼쪽으로 밀리는 경우
        if (i === x2 && j >= y1 && j <= y2) {
          if (j === y2) {
            newBoard[i][j] = board[i - 1][j];
          } else {
            newBoard[i][j] = board[i][j + 1];
          }
          if (newBoard[i][j] < min) {
            min = newBoard[i][j];
          }
        }

        // 아래쪽으로 밀리는 경우
        if (j === y2 && i > x1 && i < x2) {
          newBoard[i][j] = board[i - 1][j];
          if (newBoard[i][j] < min) {
            min = newBoard[i][j];
          }
        }

        // 위쪽으로 밀리는 경우
        if (j === y1 && i > x1 && i < x2) {
          newBoard[i][j] = board[i + 1][j];
          if (newBoard[i][j] < min) {
            min = newBoard[i][j];
          }
        }
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (!newBoard[i][j]) {
          newBoard[i][j] = board[i][j];
        }
      }
    }

    board = [...newBoard];
    newBoard = Array.from(Array(rows), () => Array(columns).fill(0));

    answer.push(min);
  });

  return answer;
}

console.log(
  solution(7, 6, [
    [2, 2, 5, 4],
    [3, 3, 6, 6],
    [5, 1, 6, 3],
  ])
);
