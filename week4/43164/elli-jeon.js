function solution(tickets) {
  let answer = [];

  tickets = tickets.sort();

  // DFS에서 새로운 값을 넣을 때는 새로운 배열을 만들어주자!!
  const DFS = (port, visit, tickets) => {
    if (tickets.length === 0) {
      answer.push([...visit, port]);
    }

    for (let i = 0; i < tickets.length; i++) {
      let [start, end] = tickets[i];
      if (start === port) {
        let newTickets = [...tickets];
        newTickets.splice(i, 1);

        DFS(end, [...visit, port], newTickets);
      }
    }
  };

  /* 
	위와 비교해보기!!

	[...visit, port] 로 새로운 배열을 만들어주지 않고,  visit.push(port) 해서 visit을 넣어주었다면,
	// DFS가 중간에 끊긴다.

	let newTickets = [...tickets]; // 이것도 [...arr] 로 제대로 복사해주지 않고 
	newTicekts = tickets 로 배열을 ref만 넘겨주면 안됨.!

	*/

  // while로 하면 문제는 DFS를 한 번밖에 못 돌림.. while말고 재귀로 해보자.
  DFS("ICN", [], tickets);

  console.log(answer);

  console.log("------");

  return answer[0];
}

// solution([
//   ["ICN", "JFK"],
//   ["HND", "IAD"],
//   ["JFK", "HND"],
// ]);

// solution([
//   ["ICN", "SFO"],
//   ["ICN", "ATL"],
//   ["SFO", "ATL"],
//   ["ATL", "ICN"],
//   ["ATL", "SFO"],
// ]);

// solution([
//   ["ICN", "AAA"],
//   ["ICN", "AAA"],
//   ["ICN", "AAA"],
//   ["AAA", "ICN"],
//   ["AAA", "ICN"],
// ]); // ["ICN", "AAA", "ICN", "AAA", "ICN", "AAA"]

solution([
  ["ICN", "A"],
  ["A", "B"],
  ["A", "C"],
  ["C", "A"],
  ["B", "D"],
]); // ["ICN", "A", "C", "A", "B", "D"]
