// @ts-nocheck
/* 
고속도로를 이동하는 차량의 경로 routes가 매개변수로 주어질 때,
모든 차량이 한 번은 단속용 카메라를 만나도록 하려면 최소 몇 대의 카메라를 설치해야 하는지

route[i] [0,1] [진입시점,나간시점]
진출, 진입지점에서 카메라 만나도 OK

달아야 하는 카메라 최소로.

그리디. 선형. 최소.

*/

function solution(routes) {
  let answer = 0;

  // 진입 시점 기준으로 정렬
  routes.sort((a, b) => a[0] - b[0]);

  let check = new Array(routes.length).fill(0);

  // 진입과 진출만 체크하자.
  let points = [];
  routes.forEach((route) => {
    points.push(route[1]);
  });

  points.sort((a, b) => a - b);

  console.log(points);

  let x = 0;
  while (x < points.length) {
    let point = points[x];

    let flag = false;
    for (let k = 0; k < check.length; k++) {
      if (isIn(routes[k], point)) {
        if (check[k] === 0) {
          check[k] = 1;
          console.log(routes[k], point);
          flag = true;
        }
      }
    }
    if (flag) answer++;
    x++;
  }

  console.log(answer);

  return answer;
}

function isIn(route, target) {
  const [start, end] = route;
  if (target >= start && target <= end) {
    return true;
  } else {
    return false;
  }
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
