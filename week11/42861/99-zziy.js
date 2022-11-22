function solution(n, costs) {
  let answer = 0;

  // 처음에는 자기 자신의 값을 부모로 가지는 배열 생성
  const parent = [];
  for (let i = 0; i < n; i++) {
    parent.push(i);
  }

  costs.sort((a, b) => a[2] - b[2]);

  // 각 섬의 부모를 찾는 재귀 함수
  // 만약 초기 값이 아니라면 parent[x]를 이용해 위로 올라가서 부모값 찾음
  const find = (parent, x) => {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent, parent[x]));
  };

  // 두 섬의 부모를 하나로 합쳐준다.
  // 이때 두 부모중 작은 값을 가지는 부모로 합쳐준다.
  const union = (parent, x, y) => {
    const n1 = find(parent, x);
    const n2 = find(parent, y);
    if (n1 < n2) return (parent[n2] = n1);
    else return (parent[n1] = n2);
  };

  for (const cost of costs) {
    // 만약 두 섬의 부모가 다르면, 즉 사이클이 형성되지 않은 상태라면
    if (find(parent, cost[0]) !== find(parent, cost[1])) {
      answer += cost[2]; // 정답에 해당 가중치를 더해준다 (오름차순으로 정렬해서 작은값 선택 가능)
      union(parent, cost[0], cost[1]); // 이제 두 섬은 연결되었으니 합쳐준다
    }
  }
  return answer;
}

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
