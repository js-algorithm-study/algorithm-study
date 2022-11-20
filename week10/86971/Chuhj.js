function solution(n, wires) {
  let answer = Infinity;

  for (let i = 0; i < wires.length; i++) {
    let [a, b] = wires[i];
    const divided = [...wires.slice(0, i), ...wires.slice(i + 1)];

    const gap = Math.abs(bfs(a, divided) - bfs(b, divided));
    if (gap < answer) answer = gap;
  }

  return answer;
}

function bfs(n, array) {
  let count = 0;
  const queue = [n];
  const visited = Array(n + 1).fill(false);

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited[current]) continue;
    visited[current] = true;
    count += 1;

    for (const wire of array) {
      const [from, to] = wire;
      if (from !== current && to !== current) continue;

      if (from === current) {
        queue.push(to);
      } else {
        queue.push(from);
      }
    }
  }
  return count;
}

console.log(
  solution(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ])
);

console.log(
  solution(4, [
    [1, 2],
    [2, 3],
    [3, 4],
  ])
);

console.log(
  solution(7, [
    [1, 2],
    [2, 7],
    [3, 7],
    [3, 4],
    [4, 5],
    [6, 7],
  ])
);
