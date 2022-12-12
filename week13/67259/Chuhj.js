function solution(board) {
  const n = board.length;
  let dp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(Infinity));

  let moves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let queue = [[0, 0, 0, 0]];

  while (queue.length > 0) {
    const [curY, curX, curCost, prevDirection] = queue.shift();

    for (let i = 0; i < moves.length; i++) {
      const [dy, dx] = moves[i];
      const [y, x] = [curY + dy, curX + dx];
      if (y < 0 || y >= n || x < 0 || x >= n || board[y][x] === 1) continue;

      const isCorner =
        ((prevDirection === 0 || prevDirection === 1) && (i === 2 || i === 3)) ||
        ((prevDirection === 2 || prevDirection === 3) && (i === 0 || i === 1));

      let cost = curCost;
      if (isCorner) {
        cost += 600;
      } else {
        cost += 100;
      }
      console.log(curY, curX, dp[curY][curX]);
      if (cost < dp[y][x]) {
        dp[y][x] = cost;
        queue.push([y, x, cost, i]);
      }
    }
  }

  return dp[n - 1][n - 1];
}

// console.log(
//   solution([
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0],
//   ])
// );
// console.log(
//   solution([
//     [0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 1, 0, 0],
//     [0, 0, 0, 0, 1, 0, 0, 0],
//     [0, 0, 0, 1, 0, 0, 0, 1],
//     [0, 0, 1, 0, 0, 0, 1, 0],
//     [0, 1, 0, 0, 0, 1, 0, 0],
//     [1, 0, 0, 0, 0, 0, 0, 0],
//   ])
// );
// console.log(
//   solution([
//     [0, 0, 1, 0],
//     [0, 0, 0, 0],
//     [0, 1, 0, 1],
//     [1, 0, 0, 0],
//   ])
// );
