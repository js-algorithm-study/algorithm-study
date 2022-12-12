const solution = (board) => {
  let answer = 1000000000;

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const n = board.length;
  const visited = Array.from(Array(n), () => Array(n).fill(0));

  const dfs = (cx, cy, cost, previousDir) => {
    if (cost >= answer + 100) return;
    if (cx === n - 1 && cy === n - 1) {
      answer = cost;
      return;
    }
    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];
      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < n &&
        !board[nx][ny] &&
        !visited[nx][ny]
      ) {
        if (!board[nx][ny] && !visited[nx][ny]) {
          visited[nx][ny] = 1;
          if (previousDir === -1) {
            dfs(nx, ny, cost + 100, i);
          } else if (
            (previousDir === 0 || previousDir === 2) &&
            (i === 1 || i === 3)
          ) {
            dfs(nx, ny, cost + 600, i);
          } else if (
            (previousDir === 1 || previousDir === 3) &&
            (i === 0 || i === 2)
          ) {
            dfs(nx, ny, cost + 600, i);
          } else {
            dfs(nx, ny, cost + 100, i);
          }

          visited[nx][ny] = 0;
        }
      }
    }
  };

  visited[0][0] = 1;
  dfs(0, 0, 0, -1);
  return answer;
};

console.log(
  solution([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);
console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ])
);
console.log(
  solution([
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 0],
  ])
);
console.log(
  solution([
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0],
  ])
);
