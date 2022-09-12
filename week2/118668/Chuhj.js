// let alp = 10;
// let cop = 10;

// let problems = [
//   [10, 15, 2, 1, 2],
//   [20, 20, 3, 3, 4],
// ];

// let alp = 0;
// let cop = 0;
// let problems = [
//   [0, 0, 1, 1, 2],
//   [10, 15, 4, 4, 4]
// ]
//

let alp = 0;
let cop = 0;
let answer = 0;

let problems = [
  [0, 0, 2, 1, 2],
  [4, 5, 3, 1, 2],
  [4, 11, 4, 0, 2],
  [10, 4, 0, 4, 2],
];

let problemsCopy = [...problems];

const targetAlp = problemsCopy.sort((a, b) => b[0] - a[0])[0][0];
const targetCop = problemsCopy.sort((a, b) => b[1] - a[1])[0][1];

console.log(targetAlp, targetCop);

const solvable = problems.filter((p) => p[0] <= alp && p[1] <= cop);

console.log(solvable);

// target에 가장 근접하게 문제를 풀거나
// 가장 가까운 문제에 가깝게 문제를 품?
// 문제 풀기 전에 어떤것이 cost가 적게 드는지 검사
