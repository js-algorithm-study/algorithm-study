// @ts-nocheck
/* 

스티커는 2행 n열로 배치

스티커를 한 장 떼면 해당 스티커의 상, 하, 좌, 우의 다른 스티커 사용 불가
각 스티커에 점수를 매기고 점수의 합이 최대가 되도록 떼어내려고 함.
점수의 최댓값 구하시오.

2행에다가 상하좌우를 못 쓰게 되므로 다음의 규칙을 지닌다.
1. 최댓값 찾고, 상하좌우 0
2. 다 0이 될 때까지 반복

위의 방법으로 하면 메모리 초과 다음의 방법
1. n이 홀수이면, 하나의 열만 제외하고 나머지 열에서 모두 골라내면 된다.
2. 제외할 열의 좌우에서 지그재그로 2개씩 총 4개의 경우의 수가 나온다.

예를 들어,
0 - 0 - 0 - 0 -
- 0 - 0 - - - 0

는 이렇게 해도 메모리 초과되네.
dp라는 것이 무조건 점화식을 세워야 되네..

dp는 큰 문제를 작은문제의 반복으로 생각하고. 작은문제의 결과를 어디에 적어두었다가 써먹음
피보나치를 생각하면 F(4) 를 구하기 위해, F(1) F(2) F(3)의 값이 필요한 것.
dp[4]를 위해 dp[1] dp[2] dp[3]이 필요하다!

*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "../test.txt";

// let input = fs.readFileSync(path).toString().split(" ");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

// console.log(inputs);

const [testCount, n1, case1First, case1Second, n2, case2First, case2Second] =
  inputs;

// @ts-ignore
for (let a = 0; a < testCount; a++) {
  const n = inputs[a * 3 + 1];
  const first = inputs[a * 3 + 2];
  const second = inputs[a * 3 + 3];

  let firstlineArr = first.split(" ").map((ele) => Number(ele));
  let secondlineArr = second.split(" ").map((ele) => Number(ele));

  // console.log(firstlineArr, secondlineArr);

  const dp = [[0, firstlineArr[0], secondlineArr[0]]];

  // @ts-ignore
  for (let i = 1; i < n; i++) {
    // console.log(i);
    dp[i] = [
      Math.max(...dp[i - 1]),
      Math.max(dp[i - 1][0], dp[i - 1][2]) + firstlineArr[i],
      Math.max(dp[i - 1][0], dp[i - 1][1]) + secondlineArr[i],
    ];
    // console.log(dp);
  }

  console.log(Math.max(...dp[n - 1]));
}
