function solution(tickets) {
  let answer = [];

  tickets = tickets.sort();

  const DFS = (port, visit, tickets) => {
    let queue = [port];

    while (queue.length > 0) {
      let now = queue.pop(); // 현재 공항
      console.log("now", now);

      visit.push(now);

      if (tickets.length === 0) {
        return answer.push(visit);
      }

      // now에서 갈 수 있는 공항들
      for (let i = 0; i < tickets.length; i++) {
        let [start, end] = tickets[i];
        if (start === now) {
          tickets.splice(i, 1);
          queue.push(end);
        }
      }
    }

    return 0;
  };

  // 문제 : DFS를 한 번밖에 못 돌림.. while말고 재귀로 해보자.

  DFS("ICN", [], tickets);

  console.log(answer);

  console.log("------");

  return answer;
}

solution([
  ["ICN", "JFK"],
  ["HND", "IAD"],
  ["JFK", "HND"],
]);

solution([
  ["ICN", "SFO"],
  ["ICN", "ATL"],
  ["SFO", "ATL"],
  ["ATL", "ICN"],
  ["ATL", "SFO"],
]);

solution([
  ["ICN", "AAA"],
  ["ICN", "AAA"],
  ["ICN", "AAA"],
  ["AAA", "ICN"],
  ["AAA", "ICN"],
]); // ["ICN", "AAA", "ICN", "AAA", "ICN", "AAA"]

solution([
  ["ICN", "A"],
  ["A", "B"],
  ["A", "C"],
  ["C", "A"],
  ["B", "D"],
]); // ["ICN", "A", "C", "A", "B", "D"]
