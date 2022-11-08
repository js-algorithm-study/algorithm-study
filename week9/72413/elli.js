/*
포인트는 합승을 굳이 하지 않아도 된다는 점.

S => A / S => B로 가는 최적의 루트를 각각 구하고. 
서로 겹치는 구간만큼 합승해서 가면 될 것 같다.

1. 서로 합승을 하지 않고 각각 따로 가는 경우.
2. 중간에 "특정 지점"까지 합승을 하고 각자 따로 가는 경우.

1의 경우 S => A + S => B
2의 경우 S => 특정 지점 + 특정 지점 => A + 특정 지점 => B

효율성 점수가 있으니깐 BFS / 다익스트라 고려

이렇게 하면 근데, 각 정점 마다 모두 다익스트라를 해야하는데?!!

ps. 다익스트라는 세가지만 기억. 1. 출발점 = 0  2. visit 배열 3. queue 돌면서 cost 덮어쓰기 

그래서 확인해보니 "한 지점"에서 다른 모든 지점 까지 최소 거리 => 다익스트라
"모든 지점"에서 다른 모든 지점까지의 최소 거리 => 플로이드 와샬 (DP)

플로이드 와샬은 "거쳐가는 정점"을 기준으로 
예를 들어, 정점 1 을 기준으로 할 때, distance[2][3] vs distance[2][1] + distance[3][1]

*/

function solution(n, s, a, b, fares) {
  let answer = Infinity;

  let cost = new Array(n + 1)
    .fill([])
    .map((ele) => new Array(n + 1).fill(Infinity));

  // [c,d,f] === [d,c,f] (양방향)
  // console.log(cost);

  for (let i = 0; i < fares.length; i++) {
    const [c, d, f] = fares[i];
    cost[c][d] = f;
    cost[d][c] = f;
  }

  // 각 정점을 기준.
  for (let j = 1; j <= n; j++) {
    for (let k = 1; k < cost.length; k++) {
      for (let l = 1; l < cost.length; l++) {
        if (k === l) {
          cost[l][k] = 0;
          cost[k][l] = 0;
        }
        cost[l][k] = Math.min(cost[l][k], cost[l][j] + cost[k][j]);
        cost[k][l] = Math.min(cost[k][l], cost[l][j] + cost[k][j]);
      }
    }
  }

  // 1.  S => A + S => B
  answer = Math.min(answer, cost[s][a] + cost[s][b]);

  // 2.  S => 특정 지점 + 특정 지점 => A + 특정 지점 => B
  for (let i = 1; i < cost.length; i++) {
    answer = Math.min(answer, cost[s][i] + cost[i][a] + cost[i][b]);
  }

  console.log(answer);

  return answer;
}

solution(6, 4, 6, 2, [
  [4, 1, 10],
  [3, 5, 24],
  [5, 6, 2],
  [3, 1, 41],
  [5, 1, 24],
  [4, 6, 50],
  [2, 4, 66],
  [2, 3, 22],
  [1, 6, 25],
]);

solution(7, 3, 4, 1, [
  [5, 7, 9],
  [4, 6, 4],
  [3, 6, 1],
  [3, 2, 3],
  [2, 1, 6],
]);

solution(6, 4, 5, 6, [
  [2, 6, 6],
  [6, 3, 7],
  [4, 6, 7],
  [6, 5, 11],
  [2, 5, 12],
  [5, 3, 20],
  [2, 4, 8],
  [4, 3, 9],
]);
