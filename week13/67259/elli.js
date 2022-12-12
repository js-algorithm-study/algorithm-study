// @ts-nocheck
/* 
- 죠르디는 출발점인 (0, 0) 칸에서 출발한 자동차가 도착점인 (N-1, N-1) 칸까지 중간에 끊기지 않도록 경주로를 건설
- 인접한 두 빈 칸을 상하 또는 좌우로 연결한 경주로를 직선 도로
- 두 직선 도로가 서로 직각으로 만나는 지점을 코너
- 경주로를 건설하는 데 필요한 최소 비용을 계산
- 0은 칸이 비어 있어 도로 연결이 가능함을 1은 칸이 벽으로 채워져 있어 도로 연결이 불가능

DFS로 가능한 경우 다 구해서.. 직선과 곡선 구하기.?
배열에 그동안 지나온 경로 적기

DFS로 가능한 모든거 구하면 시간 초과...

BFS 다익스트라로 하면 풀린다는데?? + DP

#해답 : https://school.programmers.co.kr/questions/40589

BFS + DP의 구성으로 하는 거였음. 
이 때, dp에는 cost와 direction을 같이 저장해야함. 최소 비용이어야만 dp를 교체가능하고 
직선 방향인지, 꺾이는 방향인지에 따라서 cost가 달라지기 때문에 [n-1][n-1]에 도달했어도 
direction에 따라 cost가 달라짐

*/

function solution(board) {
  const N = board.length;

  // [x][y][direction] 3차원 dp
  let dp = Array(N)
    .fill()
    .map(() =>
      Array(N)
        .fill()
        .map(() => Array(4).fill(Infinity))
    );

  // DIRECTIONS 배열의 index가 실제 방향을 탐색하는데 쓰이는 값이다. 오/왼/위/아래 -> 0/1/2/3
  const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];

  const isValid = (x, y) =>
    x >= 0 && x < N && y >= 0 && y < N && board[x][y] !== 1;
  // 초기값은 0,0에서 오른쪽 / 아래로 이동하는 경우만 지정한다.
  // [x좌표, y좌표, cost, direction]

  const queue = [
    [0, 0, 0, 0],
    [0, 0, 0, 3],
  ];

  // 무작정 짧은 경로가 아니라, 도로의 종류에 따라 비용이 달라지므로 방문여부 체크를 하면 X
  // 먼저 도달했다고 최소비용 경로가 아님.
  // board의 좌표마다 최소비용을 담아냄.
  // 도로를 방문한적 없거나 이전 보다 최소비용으로 도달하면,
  while (queue.length) {
    const [x, y, cost, dir] = queue.shift();

    for (let i = 0; i < DIRECTIONS.length; i++) {
      const [mx, my] = DIRECTIONS[i];
      const [_x, _y] = [x + mx, y + my];
      if (isValid(_x, _y)) {
        let new_cost = cost + 100;
        // 진행하는 방향과 다른 방향은 회전하는 방향이다.
        if (dir !== i) new_cost += 500;
        // 되돌아가는 방향의 cost는 무조건 new_cost보다 작기때문에 왔던 방향은 이조건에서 제외된다.
        if (new_cost < dp[_x][_y][i]) {
          dp[_x][_y][i] = new_cost;
          queue.push([_x, _y, new_cost, i]);
        }
      }
    }
  }

  return Math.min(...dp[N - 1][N - 1]);
}

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
