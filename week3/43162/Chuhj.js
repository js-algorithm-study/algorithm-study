// 연결되어있는 모든 컴퓨터를 탐색하고 다음 컴퓨터로 넘어감
// 탐색할때마다 방문 표시를 하고 방문 안한 곳만 탐색시작

function solution(n, computers) {
  let answer = 0;
  let visited = Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (dfs(i, visited, computers)) answer += 1;
  }
  return answer;
}

function dfs(start, visited, computers) {
  if (visited[start]) return false;
  visited[start] = true;
  for (let i = 0; i < computers.length; i++) {
    // i를 start + 1부터 해서 틀림
    if (computers[start][i] === 1) dfs(i, visited, computers);
  }
  return true;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
);

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ])
);
