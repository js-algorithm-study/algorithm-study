// @ts-nocheck
/* 
- n개의 노드가 있는 그래프
- 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고
- 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드

플로이드 와샬을 써보자.. 모든 노드와 모든 노드 사이의 거리

1번 노드에서 가장 먼 노드 구하는 문제였네?? 다익스트라도 되겠다. 

플로이드 와샬은 core dump;

다익스트라로 해결. 오랜만에 하니 잘 안됫다ㅠㅜ

핵심은 queue와 visited를 두고 거리 배열[]을 계속 덮어씌워주기. 
이번에는 거리가 같아서 상관없었지만 cost가 다르다면, Infinity => min으로 넣어주기 

*/

function solution(n, edge) {
  let answer = 0;

  let map = new Map();

  edge = edge.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < edge.length; i++) {
    let [start, end] = edge[i];

    // console.log(start, end);
    if (map.has(start)) {
      map.set(start, [...map.get(start), end]);
    } else {
      map.set(start, [end]);
    }

    if (map.has(end)) {
      map.set(end, [...map.get(end), start]);
    } else {
      map.set(end, [start]);
    }
  }

  // console.log(map);

  let length = new Array(n + 1).fill(0);
  let visited = new Set();

  let queue = [];
  queue.push(1);
  visited.add(1);

  while (queue.length > 0) {
    let curr = queue.shift();

    let pos = map.get(curr);
    // console.log(curr, pos);

    pos.forEach((p) => {
      if (!visited.has(p)) {
        queue.push(p);
        visited.add(p);
        length[p] = length[curr] + 1;
      }
    });
  }

  console.log(length);

  let max = Math.max(...length);

  answer = length.filter((ele) => ele === max).length;

  return answer;
}

solution(6, [
  [3, 6],
  [4, 3],
  [3, 2],
  [1, 3],
  [1, 2],
  [2, 4],
  [5, 2],
]); // 3
