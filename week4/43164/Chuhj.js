function solution(tickets) {
  let answer = ['ICN'];
  let visited = {};

  tickets.sort((a, b) => {
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    else return 0;
  });

  function dfs(current, count) {
    // 티켓을 모두 사용했으면 true를 반환
    if (count === tickets.length) return true;

    for (let i = 0; i < tickets.length; i++) {
      const [depart, dest] = tickets[i];
      if (visited[i]) continue;
      visited[i] = true;
      answer.push(dest);

      if (current === depart) {
        if (dfs(dest, count + 1)) return answer;
      }

      visited[i] = false;
      answer.pop();
    }

    return false; // 현재 위치가 출발지인 티켓을 못찾으면 false를 반환
  }

  return dfs('ICN', 0);
}

console.log(
  solution([
    ['ICN', 'JFK'],
    ['HND', 'IAD'],
    ['JFK', 'HND'],
  ])
);

console.log(
  solution([
    ['ICN', 'SFO'],
    ['ICN', 'ATL'],
    ['SFO', 'ATL'],
    ['ATL', 'ICN'],
    ['ATL', 'SFO'],
  ])
);

console.log(
  solution([
    ['ICN', 'COO'],
    ['COO', 'DOO'],
    ['COO', 'BOO'],
    ['DOO', 'COO'],
  ])
);
