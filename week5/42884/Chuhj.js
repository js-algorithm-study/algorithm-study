function solution(routes) {
  let answer = 1;

  routes.sort((a, b) => a[1] - b[1]);
  let min = routes[0][1];
  // 자동차의 출차지점에 카메라를 달아야 한 카메라가 최대한 많은 자동차를 만날 수 있음

  let count = 0;
  let nextIndex = 0;
  while (count !== routes.length) {
    // 카메라가 모든 차를 만날 때 까지
    // min 값을 옮겨서 계속 검사
    for (let i = nextIndex; i < routes.length; i++) {
      if (routes[i][0] <= min && routes[i][1] >= min) {
        count += 1;
      } else {
        min = routes[i][1];
        answer += 1;
        nextIndex = i;
        break;
      }
    }
  }

  return answer;
}

console.log(
  solution([
    [-20, -15],
    [-14, -5],
    [-18, -13],
    [-5, -3],
  ])
);
