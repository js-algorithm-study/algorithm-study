function solution(maps) {
  var answer = -1;
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  const check = Array.from(Array(maps.length), () =>
    Array(maps[0].length).fill(0)
  );

  const queue = [];
  queue.push([1, 0, 0]);

  while (queue.length > 0) {
    let [count, x, y] = queue.shift();
    if (x === maps.length - 1 && y === maps[0].length - 1) return count;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      const roadCount = count + 1;
      if (nx >= 0 && nx < maps.length && ny >= 0 && ny < maps[0].length) {
        if (maps[nx][ny] && !check[nx][ny]) {
          check[nx][ny] = 1;
          queue.push([roadCount, nx, ny]);
        }
      }
    }
  }

  return answer;
}

console.log(
  solution([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
  ])
);
