function solution(n, computers) {
  let answer = 0;
  let check = Array.from({ length: n }, () => 0);

  function dfs(v) {
    check[v] = 1;
    for (let i = 0; i < computers[v].length; i++) {
      if (!check[i] && computers[v][i]) {
        dfs(i);
      }
    }
  }

  computers.forEach((computer, i) => {
    if (!check[i]) {
      dfs(i);
      answer++;
    }
  });

  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
);
