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
<<<<<<< HEAD

=======
>>>>>>> elli/week11
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

const getParent = (parent, x) => {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
};

const unionParent = (parent, a, b) => {
  const n1 = getParent(parent, a);
  const n2 = getParent(parent, b);
  if (n1 < n2) return (parent[n2] = n1);
  else return (parent[n1] = n2);
};

const findParent = (parent, a, b) => {
  const n1 = getParent(parent, a);
  const n2 = getParent(parent, b);
  if (n1 === n2) return true;
  else return false;
};

function solution2(n, costs) {
  let answer = 0;
  const parent = [];
  for (let i = 0; i < n; i++) parent.push(i);

  costs.sort((a, b) => a[2] - b[2]);

  for (const cost of costs) {
    if (!findParent(parent, cost[0], cost[1])) {
      answer += cost[2];
      unionParent(parent, cost[0], cost[1]);
    }
  }

  console.log("s2", answer);
  return answer;
}
solution(4, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]); // 4

solution2(4, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]); // 4

solution(2, [[0, 1, 4]]); // 4
solution2(2, [[0, 1, 4]]); // 4

solution(3, [
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]); // 6

solution2(3, [
  [1, 2, 5],
  [1, 3, 1],
  [2, 3, 8],
]); // 6

solution(7, [
  [2, 3, 7],
  [3, 6, 13],
  [3, 5, 23],
  [5, 6, 25],
  [0, 1, 29],
  [1, 5, 34],
  [1, 2, 35],
  [4, 5, 53],
  [0, 4, 75],
]); // 159

solution2(7, [
  [2, 3, 7],
  [3, 6, 13],
  [3, 5, 23],
  [5, 6, 25],
  [0, 1, 29],
  [1, 5, 34],
  [1, 2, 35],
  [4, 5, 53],
  [0, 4, 75],
]); // 159

solution(5, [
  [0, 1, 5],
  [1, 2, 3],
  [2, 3, 3],
  [3, 1, 2],
  [3, 0, 4],
  [2, 4, 6],
  [4, 0, 7],
]); // 15

solution2(5, [
  [0, 1, 5],
  [1, 2, 3],
  [2, 3, 3],
  [3, 1, 2],
  [3, 0, 4],
  [2, 4, 6],
  [4, 0, 7],
]); // 15

solution(6, [
  [0, 1, 5],
  [0, 3, 2],
  [0, 4, 3],
  [1, 4, 1],
  [3, 4, 10],
  [1, 2, 2],
  [2, 5, 3],
  [4, 5, 4],
]); // 11

solution2(6, [
  [0, 1, 5],
  [0, 3, 2],
  [0, 4, 3],
  [1, 4, 1],
  [3, 4, 10],
  [1, 2, 2],
  [2, 5, 3],
  [4, 5, 4],
]); // 11

solution(5, [
  [0, 1, 1],
  [3, 1, 1],
  [0, 2, 2],
  [0, 3, 2],
  [0, 4, 100],
]); // 104

solution2(5, [
  [0, 1, 1],
  [3, 1, 1],
  [0, 2, 2],
  [0, 3, 2],
  [0, 4, 100],
]); // 104

solution(4, [
  [0, 1, 5],
  [1, 2, 3],
  [2, 3, 3],
  [3, 1, 2],
  [3, 0, 4],
]); //9

solution2(4, [
  [0, 1, 5],
  [1, 2, 3],
  [2, 3, 3],
  [3, 1, 2],
  [3, 0, 4],
]); //9

solution(4, [
  [10, 11, 1],
  [10, 5, 2],
  [11, 5, 5],
  [11, 300, 1],
  [5, 300, 8],
]);

solution2(4, [
  [10, 11, 1],
  [10, 5, 2],
  [11, 5, 5],
  [11, 300, 1],
  [5, 300, 8],
]);

solution(5, [
  [0, 1, 1],
  [3, 4, 1],
  [1, 2, 2],
  [2, 3, 4],
]); // 8

solution2(5, [
  [0, 1, 1],
  [3, 4, 1],
  [1, 2, 2],
  [2, 3, 4],
]); // 8

solution(5, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 3],
  [2, 3, 8],
  [3, 4, 1],
]); // 7

solution2(5, [
  [0, 1, 1],
  [0, 2, 2],
  [1, 2, 5],
  [1, 3, 3],
  [2, 3, 8],
  [3, 4, 1],
]); // 7

// solution(5, [
//   [0, 1, 5],
//   [1, 2, 3],
//   [2, 3, 3],
//   [3, 1, 2],
//   [3, 0, 4],
//   [2, 4, 6],
//   [4, 0, 7],
// ]); //15

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
