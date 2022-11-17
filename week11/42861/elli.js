/* 
- 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return
- 도달할 수만 있으면 통행 가능
- 순서가 바뀌더라도 같은 연결

costs 순서대로 정렬 후, 하나씩 연결시켜보면서 BFS를 돌려볼까.? 

그리디니깐 하나 넣어주면 [start, end]를 뺀 나머지 최대한 겹치지 않으면서 cost가 적은 루트를 찾아서 넣어주기!

*/

// function solution(n, costs) {
//   var answer = 0;

//   costs = costs.sort((a, b) => b[2] - a[2]); // cost 역순으로 정렬

//   let c = costs.pop();

//   let connected = [];

//   connected.push(c);

//   let total;

//   while (true) {
//     let [size, cost] = BFS(connected[0][0], connected);
//     total = size;

//     if (n === total) {
//       answer = cost;
//       break;
//     } else {
//       let c = costs.pop();
//       connected.push(c);
//     }
//   }

//   console.log(answer, "answer");

//   return answer;
// }

function solution(n, costs) {
  costs = costs.sort((a, b) => a[2] - b[2]); // 오름차순

  let list = [];
  list.push(costs.shift()); // first
  let visited = new Set();

  while (true) {
    let curr = list.shift();

    const [from, to, cost] = curr;
    visited.add(from);
    visited.add(to);

    if (visited.size === n) break;

    let min = Infinity;
    let target = 0;
    for (let i = 0; i < costs.length; i++) {
      const [newFrom, newTo, newCost] = costs[i];

      // visited에 없는 쪽 위주로 찾기
      if (
        !visited.has(newFrom && visited.has(newTo)) ||
        !visited.has(newTo && visited.has(newFrom))
      ) {
        if (newCost < min) {
          min = newCost;
          target = i;
        }
      }
    }

    list.push([...costs[target]]);
    costs.slice(target, 1);
  }
}

function BFS(start, connected) {
  let queue = [];
  let totalCosts = 0;
  let visited = new Set();

  queue.push(start);
  visited.add(start);

  console.log(connected);

  while (queue.length > 0) {
    const curr = queue.shift();

    for (let i = 0; i < connected.length; i++) {
      const [from, to, cost] = connected[i];
      if (curr === from && !visited.has(to)) {
        queue.push(to);
        visited.add(to);
        totalCosts += cost;
      }
      if (curr === to && !visited.has(from)) {
        queue.push(from);
        visited.add(from);
        totalCosts += cost;
      }
    }
  }

  console.log(queue, visited, totalCosts);

  return [visited.size, totalCosts];
}

// solution(4, [
//   [0, 1, 1],
//   [0, 2, 2],
//   [1, 2, 5],
//   [1, 3, 1],
//   [2, 3, 8],
// ]); // 4

// solution(2, [[0, 1, 4]]); // 4

// solution(3, [
//   [1, 2, 5],
//   [1, 3, 1],
//   [2, 3, 8],
// ]); // 6

// solution(7, [
//   [2, 3, 7],
//   [3, 6, 13],
//   [3, 5, 23],
//   [5, 6, 25],
//   [0, 1, 29],
//   [1, 5, 34],
//   [1, 2, 35],
//   [4, 5, 53],
//   [0, 4, 75],
// ]); // 159

// solution(5, [
//   [0, 1, 5],
//   [1, 2, 3],
//   [2, 3, 3],
//   [3, 1, 2],
//   [3, 0, 4],
//   [2, 4, 6],
//   [4, 0, 7],
// ]); // 15

// solution(6, [
//   [0, 1, 5],
//   [0, 3, 2],
//   [0, 4, 3],
//   [1, 4, 1],
//   [3, 4, 10],
//   [1, 2, 2],
//   [2, 5, 3],
//   [4, 5, 4],
// ]); // 11

solution(5, [
  [0, 1, 1],
  [3, 1, 1],
  [0, 2, 2],
  [0, 3, 2],
  [0, 4, 100],
]); // 104
