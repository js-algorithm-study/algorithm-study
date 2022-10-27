function solution(N, road, K) {
  let village = Array(N + 1).fill(Infinity); // 각 마을로 갈 수 있는 최소값을 기록
  village[1] = 0;

  let queue = [[1, 0]];

  while (queue.length > 0) {
    let [current, acc] = queue.shift();

    for (let i = 0; i < road.length; i++) {
      if (current !== road[i][0] && current !== road[i][1]) continue;
      // current의 반대편을 도착지로 설정
      const dest = current === road[i][0] ? road[i][1] : road[i][0];

      if (village[dest] <= acc + road[i][2]) continue;
      // 해당하는 길로 갔을 때 최소 값만 업데이트
      village[dest] = acc + road[i][2];
      queue.push([dest, acc + road[i][2]]);
    }
  }

  return village.filter((v) => v <= K).length;
}

console.log(
  solution(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3
  )
);

console.log(
  solution(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [5, 6, 1],
    ],
    4
  )
);

console.log(solution(2, [[1, 2, 3]], 3));
