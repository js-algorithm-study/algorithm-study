/* 
- 죠르디는 출발점인 (0, 0) 칸에서 출발한 자동차가 도착점인 (N-1, N-1) 칸까지 중간에 끊기지 않도록 경주로를 건설
- 인접한 두 빈 칸을 상하 또는 좌우로 연결한 경주로를 직선 도로
- 두 직선 도로가 서로 직각으로 만나는 지점을 코너
- 경주로를 건설하는 데 필요한 최소 비용을 계산
- 0은 칸이 비어 있어 도로 연결이 가능함을 1은 칸이 벽으로 채워져 있어 도로 연결이 불가능

DFS로 가능한 경우 다 구해서.. 직선과 곡선 구하기.?
배열에 그동안 지나온 경로 적기

DFS로 가능한 모든거 구하면 시간 초과...
*/

function solution(board) {
  let answer = Infinity;

  let possibles = [];

  DFS(board, [[0, 0]], possibles);

  // console.log(possibles, "possibles");

  possibles.forEach((p) => {
    let price = calculate(p);
    if (price < answer) answer = price;
  });
  // console.log(answer, "ans");

  return answer;
}

function DFS(board, routes, possibles) {
  const node = routes[routes.length - 1];
  const [x, y] = node;
  // console.log("x", x, "y", y);

  if (x === board.length - 1 && y === board.length - 1) {
    possibles.push(routes);
    // console.log("x === board.length - 1 && y === board.length - 1");
    return;
  }

  const paths = getPath(x, y, board.length - 1);

  let filtered = paths.filter(([a, b]) => board[a][b] === 0);

  // console.log(filtered, "filtered");

  if (filtered.length === 0) {
    possibles.push(routes);
    // console.log("filtered.length === 0");
    return;
  }

  for (let i = 0; i < filtered.length; i++) {
    const [a, b] = filtered[i];
    if (board[a][b] === 0) {
      // console.log("a", a, "b", b);
      if (a === x && b === y) continue;

      let past = routes.filter((route) => route[0] === a && route[1] === b);

      if (past.length > 0) continue;

      let newRoutes = [...routes, [a, b]];
      DFS(board, newRoutes, possibles);
    }
  }
}

/**
 *
 * @param {Array} array
 */
function calculate(array) {
  let direct = 0;
  let corner = 0;

  direct = array.length - 1;

  for (let i = 0; i < array.length; i++) {
    // 3개를 이어서 보자
    if (i + 2 > array.length - 1) break;

    const [x, y] = array[i];
    const [nextX, nextY] = array[i + 2];

    if (nextX - x === 2 || nextY - y === 2) {
      continue;
    } else {
      corner++;
    }
  }

  return direct * 100 + corner * 500;
}

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} max
 * x+1 y / x-1, y / x y+1 / x Y-1
 */
function getPath(x, y, max) {
  if (x === 0) {
    if (y === 0) {
      return [
        [x + 1, y],
        [x, y + 1],
      ];
    }
    if (y > 0 && y < max) {
      return [
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
    }
    if (y === max) {
      return [
        [x + 1, y],
        [x, y - 1],
      ];
    }
  }

  if (x > 0 && x < max) {
    if (y === 0) {
      return [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
      ];
    }
    if (y > 0 && y < max) {
      return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
    }
    if (y === max) {
      return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
      ];
    }
  }

  if (x === max) {
    if (y === 0) {
      return [
        [x - 1, y],
        [x, y + 1],
      ];
    }
    if (y > 0 && y < max) {
      return [
        [x - 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
    }
    if (y === max) {
      return [
        [x - 1, y],
        [x, y - 1],
      ];
    }
  }

  return [];
}

// solution([
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ]); // 900

solution([
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0],
]); // 3800

// solution([
//   [0, 0, 1, 0],
//   [0, 0, 0, 0],
//   [0, 1, 0, 1],
//   [1, 0, 0, 0],
// ]); //2100

// solution([
//   [0, 0, 0, 0, 0, 0],
//   [0, 1, 1, 1, 1, 0],
//   [0, 0, 1, 0, 0, 0],
//   [1, 0, 0, 1, 0, 1],
//   [0, 1, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 0],
// ]); // 3200
