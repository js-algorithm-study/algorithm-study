function solution(routes) {
  let answer = 1;
  // 진출시점 정렬
  routes.sort((a, b) => a[1] - b[1]);

  let minExit = routes[0][1]; // 시작이 1인 이유.

  // 핵심은 routes를 돌면서 이미 포함한 route들은 확실하게 체크 안 하는 것. (checkedRoute로 성취)

  let checkedRoute = 0; // count하면 이 index를 올려서 이미 포함된 route 체크 안 하게!!

  while (checkedRoute !== routes.length) {
    for (let i = checkedRoute; i < routes.length; i++) {
      const [start, end] = routes[i];
      // console.log(start, end, minExit);

      if (minExit >= start && minExit <= end) {
        console.log("include");
        checkedRoute++;
      } else {
        console.log("exclude");
        // 이미 포함한 route는 제외했으니 가장 마지막 진출시점보다 뒤에 있는 route. 여기에 카메라 설치.
        minExit = end;
        answer++;
        checkedRoute = i;
        break;
      }
    }
  }

  console.log(answer);
  return answer;
}

// solution([
//   [-20, 15],
//   [-14, -5],
//   [-18, -13],
//   [-5, -3],
// ]); //2

solution([
  [-14, -5],
  [-20, -15],
  [-18, -13],
  [-5, -3],
]); // 2

// solution([
//   [-2, -1],
//   [1, 2],
//   [-3, 0],
// ]); //2

// solution([[0, 0]]); //1

// solution([
//   [0, 1],
//   [0, 1],
//   [1, 2],
// ]); //1

// solution([
//   [0, 1],
//   [2, 3],
//   [4, 5],
//   [6, 7],
// ]); //4

// solution([
//   [-20, -15],
//   [-14, -5],
//   [-18, -13],
//   [-5, -3],
// ]); //2

// solution([
//   [-20, 15],
//   [-20, -15],
//   [-14, -5],
//   [-18, -13],
//   [-5, -3],
// ]); //2
