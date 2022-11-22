function solution(n, edge) {
  const graph = Array.from(Array(n + 1), () => Array([]));
  const visited = Array(n + 1).fill(0);
  const countMap = new Map();
  let max = 0;

  // 인접 행렬
  /* for (let [a, b] of edge) {
    graph[a][b] = 1;
    graph[b][a] = 1;
  } */

  for (let [a, b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const queue = [[1, 1]];
  visited[1] = 1;

  while (queue.length) {
    const [node, level] = queue.shift();
    for (let i = 1; i < graph[node].length; i++) {
      const v = graph[node][i];
      if (!visited[v]) {
        queue.push([v, level + 1]);
        visited[v] = 1;
        if (!countMap.has(level + 1)) {
          countMap.set(level + 1, 1);
        } else {
          countMap.set(level + 1, countMap.get(level + 1) + 1);
        }
        max = level + 1;
      }
    }
  }

  return countMap.get(max);
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ])
);
