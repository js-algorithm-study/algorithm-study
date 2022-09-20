// @ts-nocheck
/* 
상대 팀 진형에 최대한 빨리 도착하라. ?? DFS
검은색 부분은 갈 수 없고, 흰색만 가능. 계속 들어간다 ?? DFS
현재 위치에서 가장 가까운 곳을 먼저 찾기?? BFS
상대 진형에 도착할 수 없는 경우도 있다. => 상대 팀 주위를 쭉 둘러보면서 체크
0은 벽, 1은 갈 수 있는 자리
(1,1) ~ (n,m)

*/

function solution(maps) {
  let answer = -1;
  let n = maps.length; // 행 y축
  let m = maps[0].length; // 열 x축

  // 핵심 : cost를 붙여줘서 값을 기억, 한번 지나간 곳은 벽으로

  // BFS, DFS는 시작을 채우면서.
  queue = [[0, 0, 1]]; // i, j, cost

  while (queue.length > 0) {
    let [p, q, cost] = queue.shift();

    if (p === n - 1 && q === m - 1) {
      return cost;
    }

    if (cost > n * m) {
      return -1;
    }

    const possible = [
      [p - 1, q, cost],
      [p + 1, q, cost],
      [p, q - 1, cost],
      [p, q + 1, cost],
    ];

    for (let [a, b, cost] of possible) {
      if (a < 0 || a >= n || b < 0 || b >= m) continue;
      if (maps[a][b]) {
        maps[p][q] = 0;
        queue.push([a, b, cost + 1]);
      }
    }
  }

  return answer;
}

// solution([
//   [1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1],
//   [1, 0, 1, 1, 1],
//   [1, 1, 1, 0, 1],
//   [0, 0, 0, 0, 1],
// ]); // 11

// solution([
//   [1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1],
//   [1, 0, 1, 1, 1],
//   [1, 1, 1, 0, 0],
//   [0, 0, 0, 0, 1],
// ]); // -1

// function print(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
//   }
//   console.log("-------");
// }
