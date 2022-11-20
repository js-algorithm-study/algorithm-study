// @ts-nocheck
/* 
- 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return
- 도달할 수만 있으면 통행 가능
- 순서가 바뀌더라도 같은 연결

costs 순서대로 정렬 후, 하나씩 연결시켜보면서 BFS를 돌려볼까.? 

그리디니깐 하나 넣어주면 [start, end]를 뺀 나머지 최대한 겹치지 않으면서 cost가 적은 루트를 찾아서 넣어주기!

--- 해답

기본적인 생각은 맞았음.

1. n개의 정점에 n-1개의 간선이 있을 것이다.
2. 다음 간선을 고를 때, 현재 정점들과 연결이 적은 것을 선택.

이러한 것을 설명하는 알고리즘이. 크루스칼 알고리즘 (최소 신장 트리)

신장 트리(spanning tree)란? 모든 정점이 연결 / 싸이클이 존재 하지 않음. (n개 정점 n-1개 간선)

크루스칼 알고리즘은 

1. 가중치의 오름차순 정렬
2. 사이클 형성되지 않는 선에서 간선 선택
3. 간선의 개수가 n-1이 되면 stop

이 때, 싸이클을 만들지 않는 방법은? 즉, 기존의 연결 노드들과 연관이 없는 간선을 어떻게 골라내는가?

Union & Find 방법을 사용!

*/

/**
 *
 * @param {number} n
 * @param {Array} costs
 * @returns
 */
function solution(n, costs) {
  let answer = 0;

  costs = costs.sort((a, b) => a[2] - b[2]);

  // 가중치 오름차순 정렬
  // console.log(costs);

  let nodes = new Set();

  costs.forEach((c) => {
    nodes.add(c[0]);
    nodes.add(c[1]);
  });

  nodes = Array.from(nodes);

  // Find Union을 위한 객체
  let parent = {};

  nodes.forEach((n) => (parent[n] = n));

  let lines = 0;

  while (lines < n - 1) {
    let curr = costs.shift();
    // console.log("curr", curr);

    let [from, to, cost] = curr;

    // parent node는 최솟값으로 가정
    if (parent[from] !== parent[to]) {
      answer += cost;
      lines++;
      // 서로 다른 parent를 가진 node만 합침.
      let min = Math.min(parent[from], parent[to]);

      Object.entries(parent).forEach((n) => {
        let key = n[0];
        let value = n[1];
        if (value === parent[from] || value === parent[to]) {
          parent[key] = min;
        }
      });

      // console.log(parent, "parent");
    }
  }

  console.log(answer, "answer");

  return answer;
}

const solution2 = (n, costs) => {
  costs.sort((a, b) => a[2] - b[2]);
  let parent = Array.from({ length: n }, (val, idx) => idx);
  let rank = new Array(n).fill(0);

  const find = (x) => {
    if (parent[x] == x) return x;
    return (parent[x] = find(parent[x]));
  };

  const union = (x, y) => {
    let px = find(x),
      py = find(y);

    if (rank[px] > rank[py]) {
      parent[py] = px;
    } else {
      parent[px] = py;

      if (rank[px] == rank[py]) rank[px]++;
    }
  };

  let cnt = 0;
  let answer = 0;

  for (let idx in costs) {
    let a = find(costs[idx][0]);
    let b = find(costs[idx][1]);

    if (a == b) continue;

    union(a, b);
    answer += costs[idx][2];
    cnt++;

    if (cnt == n - 1) break;
  }

  console.log("s2, answer", answer);

  return answer;
};

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

// solution(5, [
//   [0, 1, 1],
//   [3, 1, 1],
//   [0, 2, 2],
//   [0, 3, 2],
//   [0, 4, 100],
// ]); // 104

// solution(4, [
//   [0, 1, 5],
//   [1, 2, 3],
//   [2, 3, 3],
//   [3, 1, 2],
//   [3, 0, 4],
// ]); //9

// solution(4, [
//   [10, 11, 1],
//   [10, 5, 2],
//   [11, 5, 5],
//   [11, 300, 1],
//   [5, 300, 8],
// ]);

// solution(5, [
//   [0, 1, 1],
//   [3, 4, 1],
//   [1, 2, 2],
//   [2, 3, 4],
// ]); // 8

// solution(5, [
//   [0, 1, 1],
//   [0, 2, 2],
//   [1, 2, 5],
//   [1, 3, 3],
//   [2, 3, 8],
//   [3, 4, 1],
// ]); // 7

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
// ]);

// solution(5, [
//   [0, 1, 5],
//   [1, 2, 3],
//   [2, 3, 3],
//   [3, 1, 2],
//   [3, 0, 4],
//   [2, 4, 6],
//   [4, 0, 7],
// ]); //15

solution(4, [
  [2, 3, 3],
  [2, 4, 4],
  [3, 4, 7],
  [3, 5, 3],
  [4, 5, 10],
]); // 10

solution(4, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]); //4

solution2(4, [
  [5, 6, 1],
  [5, 7, 2],
  [6, 7, 5],
  [6, 8, 1],
  [7, 8, 8],
]); // 4 => 왜 0 이 나옴?

solution2(4, [
  [2, 3, 3],
  [2, 4, 4],
  [3, 4, 7],
  [3, 5, 3],
  [4, 5, 10],
]); // 10 => 왜 이게 6이 나옴??

// solution(4, [
//   [0, 1, 1],
//   [0, 2, 2],
//   [2, 3, 1],
// ]); // 4

// solution(5, [
//   [0, 1, 5],
//   [1, 2, 3],
//   [2, 3, 3],
//   [3, 1, 2],
//   [3, 0, 4],
//   [2, 4, 6],
//   [4, 0, 7],
// ]); //15
