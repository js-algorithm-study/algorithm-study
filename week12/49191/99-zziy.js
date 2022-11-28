function solution(n, results) {
  const graph = Array.from(Array(n), () => Array(n).fill(0));
  let answer = 0;

  results.forEach((result) => {
    const [winner, loser] = result.map((x) => x - 1);
    graph[winner][loser] = 1;
    graph[loser][winner] = -1;
  });

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (graph[i][k] === 1 && graph[k][j] === 1) {
          graph[i][j] = 1;
        }
        if (graph[i][k] === -1 && graph[k][j] === -1) {
          graph[i][j] = -1;
        }
      }
    }
  }

  for (let i = 0; i < graph.length; i++) {
    const filteredGraph = graph[i].filter((x) => x === 0);
    if (filteredGraph.length === 1) {
      answer++;
    }
  }

  return answer;
}

console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ])
);
