/* 

- 전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전력망으로 
- 두 전력망이 가지고 있는 송전탑 개수의 차이(절대값)를 return
- v1번 송전탑과 v2번 송전탑 [v1, v2]

하나의 트림 -> 두개의 트리
트리 형태.. 원형 구성이 없다? 하나만 자르면 무조건 두개로 나뉜다?

자른 것을 양쪽 트리의 시작점으로 놓고 BFS를 사용해서 각각의 트리의 구성원 파악
[4,7] 이라면 4를 기준으로 한 트리 BFS, 7을 기준으로 한 트리 BFS

*/

function solution(n, wires) {
  let answer = Infinity;

  for (let i = 0; i < wires.length; i++) {
    let [v1, v2] = wires[i];
    let filtered = wires.filter((ele) => ele[0] !== v1 || ele[1] !== v2);
    let min = Math.abs(BFS(v1, filtered) - BFS(v2, filtered));
    console.log([v1, v2], min);
    answer = Math.min(answer, min);
  }

  // console.log("answer", answer);

  return answer;
}

function BFS(start, wires) {
  let answer = new Set();
  answer.add(start);

  let queue = [start];
  let visited = [];

  while (queue.length > 0) {
    let now = queue.shift();

    for (let j = 0; j < wires.length; j++) {
      let [v1, v2] = wires[j];
      if (v1 === now && !visited.includes(v2)) {
        queue.push(v2);
        visited.push(v2);
        answer.add(v2);
        continue;
      }
      if (v2 === now && !visited.includes(v1)) {
        queue.push(v1);
        visited.push(v1);
        answer.add(v1);
        continue;
      }
    }
  }

  return answer.size;
}

// solution(9, [
//   [1, 3],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [4, 6],
//   [4, 7],
//   [7, 8],
//   [7, 9],
// ]); // 3

solution(4, [
  [1, 2],
  [2, 3],
  [3, 4],
]); // 0

solution(7, [
  [1, 2],
  [2, 7],
  [3, 7],
  [3, 4],
  [4, 5],
  [6, 7],
]); // 1
