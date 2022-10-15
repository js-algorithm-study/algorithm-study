function solution(n, road, k) {
  let answer = 1;
  let check = Array.from({ length: n }).fill(0);
  let graph = Array.from(Array(n), () => Array(n).fill(0));
  let temp = [];
  let min = n * 10000;

  road.sort((a, b) => b[2] - a[2]);

  for (let [a, b, c] of road) {
    graph[a - 1][b - 1] = c;
    graph[b - 1][a - 1] = c;
  }

  function dfs(L, v, time) {
    if (v === 0) {
      if (min > time) {
        min = time;
        temp.push(min);
      }
    } else {
      for (let i = 0; i < graph[v].length; i++) {
        if (graph[v][i] !== 0 && !check[i]) {
          const sum = time + graph[v][i];
          if (sum < min) {
            check[i] = 1;
            dfs(L, i, sum);
            check[i] = 0;
          }
        }
      }
    }
  }

  for (let i = 1; i < n; i++) {
    check.fill(0);
    temp = [];
    min = n * 10000;
    dfs(i + 1, i, 0);
    min = Math.min(...temp);
    if (min <= k) answer++;
  }

  return answer;
}

console.log(
  solution(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [5, 6, 1],
    ],
    4
  )
);
