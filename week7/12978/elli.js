/* 
n개의 마을로 이루어진 나라

x번 마을에서 k시간 이내로 배달하려고 한다.

다익스트라 생각이 난다. road를 돌면서 DFS로 1번 부터 각 마을에 걸리는 시간 min을 교체할까?

다익스트라의 핵심 생각은. 

1. 시작 노드를 잡고서, 해당 지점부터 다른 지점까지의 거리를 infinity로 설정.
2. 해당 노드로부터 인접 지점까지의 거리를 체크해서 더 작으면 넣어줌.
3. visited한 노드의 값은 시작 노드부터 해당 노드까지의 가장 짧은 거리가 되는 것.
4. 하나씩 번진다는 느낌으로 이해하면 될듯!
*/

function solution(N, road, K) {
  let answer = 0;

  const table = new Array(N + 1).fill(Infinity); // 1번 마을에서 각 마을까지의 걸리는 시간

  // 일반적으로 다익스트라는 visited를 설정한다. 이게 없으면 계속 queue에 들어가서 끝이 없기때문.
  // 하지만 이 문제에서는 다른 조건을 설정한다. visited가 아직 false인 경우가 아니라 더 작은 시간이 될때만 추가를 시킨다.
  // let visited = new Array(N + 1).fill(false);

  table[0] = 0;
  // visited[0] = true;
  table[1] = 0;
  // visited[1] = true;

  // table init
  // [0, 0, infinity, infinity, infinity, infinity, infinity]

  let queue = [];
  queue.push(1); //1번 마을에서 시작. 다익스트라 : 노드 하나에서 다른 모든 노드까지의 거리

  // BFS
  while (queue.length > 0) {
    // @ts-ignore
    const curr = queue.shift(); // 1 현재 노드
    // visited[curr] = true;
    // console.log("curr", curr);

    let min = table[curr]; // 현재 노드까지의 값을 더해주면 됨.
    //현 지점의 값이 곧 1번 마을에서 현 지점까지의 거리
    // console.log("min", min);

    for (let i = 0; i < road.length; i++) {
      const [start, end, len] = road[i];
      // console.log(start, end, len);
      if (curr === start) {
        // 이렇게, 새로운 거리가 기존의 것보다 더 작은 경우에만 queue에 더해준다.
        if (min + len < table[end]) {
          queue.push(end);
          table[end] = min + len;
        }
      }
      if (curr === end) {
        if (min + len < table[start]) {
          queue.push(start);
          table[start] = min + len;
        }
      }
    }
    // console.log(queue, "queue");
  }

  // console.log("table end", table);
  table.forEach((ele, idx) => {
    if (ele <= K && idx >= 1) answer++;
  });

  console.log("answer", answer);

  return answer;
}

// solution(
//   5,
//   [
//     [1, 2, 1],
//     [2, 3, 3],
//     [5, 2, 2],
//     [1, 4, 2],
//     [5, 3, 1],
//     [5, 4, 2],
//   ],
//   3
// );

// solution(
//   6,
//   [
//     [1, 2, 1],
//     [1, 3, 2],
//     [2, 3, 2],
//     [3, 4, 3],
//     [3, 5, 2],
//     [3, 5, 3],
//     [5, 6, 1],
//   ],
//   4
// );
