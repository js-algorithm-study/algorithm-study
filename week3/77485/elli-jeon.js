/*
rows x columns

*/

function solution(rows, columns, queries) {
  let answer = [];

  // 최초 array 구성
  let array = [];

  for (let i = 0; i < rows; i++) {
    let line = [];
    for (let j = 0; j < columns; j++) {
      const number = columns * i + j + 1;
      line.push(number);
    }
    array.push(line);
  }

  // queries for 문.
  queries.forEach((query) => {
    turnArray(query, array, answer);
  });

  console.log("answer", answer);

  return answer;
}

/**
 *
 * @param {Array} query
 * @param {Array} arr
 */
function turnArray(query, arr, answer) {
  query = query.map((ele) => ele - 1); // 1행 1열 => [0][0]

  let targetNums = [];

  let minX = query[0];
  let minY = query[1];
  let maxX = query[2];
  let maxY = query[3];

  // 시계방향 순
  for (let i = minX; i < maxX; i++) {
    targetNums.push([i, minY]);
  }

  for (let i = minY; i < maxY; i++) {
    targetNums.push([maxX, i]);
  }

  for (let i = maxX; i > minX; i--) {
    targetNums.push([i, maxY]);
  }

  for (let i = maxY; i > minY; i--) {
    targetNums.push([minX, i]);
  }

  // 가장 작은 수 answer에 넣어두고
  const answerArr = targetNums.map((ele) => {
    const [x, y] = ele;
    return arr[x][y];
  });

  answer.push(answerArr.sort((a, b) => a - b)[0]);

  // 맨처음거 미리 보관.
  const first = arr[targetNums[0][0]][targetNums[0][1]];

  // 시계방향으로, 다음거에 이전거를 담아주기.
  for (let p = 0; p < targetNums.length; p++) {
    const [x, y] = targetNums[p];

    // 마지막거에는 기억해둔 맨 처음거 넣어주기
    if (p === targetNums.length - 1) {
      arr[x][y] = first;
      break;
    }

    const nextX = targetNums[p + 1][0];
    const nextY = targetNums[p + 1][1];

    arr[x][y] = arr[nextX][nextY];
  }

  return arr;
}

/**
 *
 * @param {number} r
 * @param {number} c
 * @param {Array} arr
 */
function print(r, c, arr) {
  for (let i = 0; i < r; i++) {
    console.log(arr[i]);
  }
}

// solution(6, 6, [
//   [2, 2, 5, 4],
//   [3, 3, 6, 6],
//   [5, 1, 6, 3],
// ]);

// solution(3, 3, [
//   [1, 1, 2, 2],
//   [1, 2, 2, 3],
//   [2, 1, 3, 2],
//   [2, 2, 3, 3],
// ]);

solution(100, 97, [[1, 1, 100, 97]]);
