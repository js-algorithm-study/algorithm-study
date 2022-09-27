function solution(maps) {
  // 4방향 중 갈 수 있는 곳으로 계속 나아가야함.
  let visited = Array(maps.length)
    .fill()
    .map(() => Array(maps[0].length).fill(false));

  const endy = maps.length - 1;
  const endx = maps[0].length - 1;

  const move = [
    [1, 0], // down
    [-1, 0], // up
    [0, 1], // right
    [0, -1], // left
  ];

  let queue = [[0, 0, 1]];

  while (queue.length > 0) {
    const [y, x, count] = queue.shift();

    if (visited[y][x]) continue;
    visited[y][x] = true;

    if (endy === y && endx === x) {
      return count;
    }

    for (let i = 0; i < 4; i++) {
      // 4방향으로 이동
      const [dy, dx] = move[i];
      const [my, mx] = [y + dy, x + dx];
      if (my < 0 || mx < 0 || my > endy || mx > endx) continue;
      if (maps[my][mx] === 0) continue;
      if (maps[my][mx] === 1) {
        queue.push([my, mx, count + 1]);
      }
    }
  }

  return -1;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ])
);

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])
);
