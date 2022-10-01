function solution(routes) {
  let answer = 0;

  routes.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    else return b[0] - a[0];
  });

  while (routes.length) {
    const [start, end] = routes.shift();
    for (let i = 0; i < routes.length; i++) {
      const [nextStart, nextEnd] = routes[i];
      if (start <= nextEnd) {
        routes.splice(i, 1);
        i--;
      }
    }
    answer++;
  }

  return answer;
}

console.log(
  solution([
    [-100, 100],
    [50, 170],
    [150, 200],
    [-50, -10],
    [10, 20],
    [30, 40],
  ])
);

/* console.log(
  solution([
    [0, -30000],
    [1, -30000],
    [2, -30000],
  ])
);

console.log(
  solution([
    [-2, -1],
    [1, 2],
    [-3, 0],
  ])
); //2

console.log(solution([[0, 0]])); //1
console.log(
  solution([
    [0, 1],
    [0, 1],
    [1, 2],
  ])
); //1
console.log(
  solution([
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
  ])
); //4

console.log(
  solution([
    [-20, -15],
    [-14, -5],
    [-18, -13],
    [-5, -3],
  ])
); //2
console.log(
  solution([
    [-20, 15],
    [-14, -5],
    [-18, -13],
    [-5, -3],
  ])
); //2
console.log(
  solution([
    [-20, 15],
    [-20, -15],
    [-14, -5],
    [-18, -13],
    [-5, -3],
  ])
); //2 */

// [[0,12],[1,12],[2,12],[3,12],[5,6],[6,12],[10,12]]
