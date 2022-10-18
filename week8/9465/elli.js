/* 

스티커는 2행 n열로 배치

스티커를 한 장 떼면 해당 스티커의 상, 하, 좌, 우의 다른 스티커 사용 불가
각 스티커에 점수를 매기고 점수의 합이 최대가 되도록 떼어내려고 함.
점수의 최댓값 구하시오.

2행에다가 상하좌우를 못 쓰게 되므로 다음의 규칙을 지닌다.
1. 최댓값 찾고, 상하좌우 0
2. 다 0이 될 때까지 반복

*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "./test.txt";

// let input = fs.readFileSync(path).toString().split(" ");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

// console.log(inputs);

const [
  testCount,
  row1,
  case1First,
  case1Second,
  row2,
  case2First,
  case2Second,
] = inputs;

solution(row1, case1First, case1Second);
solution(row2, case2First, case2Second);

function solution(n, firstline, secondline) {
  let answer = 0;

  let firstArr = firstline.split(" ").map((ele) => Number(ele));
  let secondArr = secondline.split(" ").map((ele) => Number(ele));

  while (true) {
    // console.log(firstArr, secondArr);

    // 1. find max
    let max = 0;
    let row = 1;
    let col = 0;

    for (let i = 0; i < firstArr.length; i++) {
      if (max < firstArr[i]) {
        row = 1;
        col = i;
        max = firstArr[i];
      }
    }
    for (let i = 0; i < secondArr.length; i++) {
      if (max < secondArr[i]) {
        row = 2;
        col = i;
        max = secondArr[i];
      }
    }

    // console.log("max", max, row, col);
    answer += max;

    // 2. remove neighbor
    if (row === 1) {
      let neighbor = [
        [1, col - 1],
        [1, col + 1],
        [1, col],
        [2, col],
      ];
      for (let j = 0; j < neighbor.length; j++) {
        const [r, c] = neighbor[j];
        if (r === 1 && c >= 0 && c < n) {
          firstArr = [...firstArr.slice(0, c), 0, ...firstArr.slice(c + 1)];
        }
        if (r === 2) {
          secondArr = [...secondArr.slice(0, c), 0, ...secondArr.slice(c + 1)];
        }
      }
    }
    if (row === 2) {
      let neighbor = [
        [2, col - 1],
        [2, col + 1],
        [2, col],
        [1, col],
      ];
      for (let j = 0; j < neighbor.length; j++) {
        const [r, c] = neighbor[j];
        if (r === 2 && c >= 0 && c < n) {
          secondArr = [...secondArr.slice(0, c), 0, ...secondArr.slice(c + 1)];
        }
        if (r === 1) {
          firstArr = [...firstArr.slice(0, c), 0, ...firstArr.slice(c + 1)];
        }
      }
    }

    // console.log("after", firstArr, secondArr);

    // console.log("----");

    if (max === 0) break;
  }

  console.log(answer);

  return answer;
}
