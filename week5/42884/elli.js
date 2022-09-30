// @ts-nocheck
/* 
고속도로를 이동하는 차량의 경로 routes가 매개변수로 주어질 때,
모든 차량이 한 번은 단속용 카메라를 만나도록 하려면 최소 몇 대의 카메라를 설치해야 하는지

route[i] [0,1] [진입시점,나간시점]
진출, 진입지점에서 카메라 만나도 OK

달아야 하는 카메라 최소.

그리디. 카메라의 수는 최소가 되어야. 가장 긴 것부터 차례로..?
*/

function solution(routes) {
  // 진입, 진출 시점 최소 ~ 최대 구해야

  let max = routes.sort((a, b) => b[1] - a[1])[0][1];
  let min = routes.sort((a, b) => a[0] - b[0])[0][0];
}

// solution([
//   [-20, -15],
//   [-14, -5],
//   [-18, -13],
//   [-5, -3],
// ]); // 2

solution([
  [-2, -1],
  [1, 2],
  [-3, 0],
]); //2

solution([[0, 0]]); //1

solution([
  [0, 1],
  [0, 1],
  [1, 2],
]); //1

solution([
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
]); //4

solution([
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
]); //2

solution([
  [-20, 15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
]); //2

solution([
  [-20, 15],
  [-20, -15],
  [-14, -5],
  [-18, -13],
  [-5, -3],
]); //2
