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
    let [a, b, cost] = queue.shift();

    maps[a][b] = 0; // 막아주기.

    if (a === n - 1 && b === m - 1) {
      return cost;
    }

    if (cost > n * m) {
      return -1;
    }

    // 이렇게하면 효율성 통과 하나도 못함..!!
    // const possible = [
    //   [p - 1, q, cost],
    //   [p + 1, q, cost],
    //   [p, q - 1, cost],
    //   [p, q + 1, cost],
    // ];

    // for (let [a, b, cost] of possible) {
    //   if (a < 0 || a >= n || b < 0 || b >= m) continue;
    //   if (maps[a][b]) {
    //     maps[p][q] = 0;
    //     queue.push([a, b, cost + 1]);
    //   }
    // }

    const d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    // 다 통과.
    // for (let i = 0; i < 4; i++) {
    //   const [da, db] = d[i];
    //   if (a + da < 0 || a + da >= n || b + db < 0 || b + db >= m) continue;
    //   if (maps[a + da][b + db]) {
    //     maps[a + da][b + db] = 0;
    //     queue.push([a + da, b + db, cost + 1]);
    //   }
    // }

    // 3번만 실패
    d.forEach((distance) => {
      const [da, db] = distance;
      if (a + da < 0 || a + da >= n || b + db < 0 || b + db >= m) return 0;
      if (maps[a + da][b + db]) {
        maps[a + da][b + db] = 0;
        queue.push([a + da, b + db, cost + 1]);
      }
    });

    // forEach의 퍼포먼스가 제일 빠르다고 알고 있었는데.... 어케된거지?
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
