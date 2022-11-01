// @ts-nocheck
/* 
계단을 밟으면 점수!

1. 한번에 한 계단 or 두 계단
2. 연속된 세 계단 불가
3. 마지막은 무조건

*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "../test.txt";

// let input = fs.readFileSync(path).toString().split(" ");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

// @ts-ignore
inputs = inputs.map((ele) => Number(ele));

let count = inputs[0];
let stairs = inputs.slice(1);

// console.log(count, stairs);

let dp = new Array(count).fill(0);

// 4가 끝이라고 가정하면, 가능한 경우는 다음 두 가지. O X O O or O X O

// dp[i] = Math.max(dp[i-3] + stair[i] + stair[i-1], dp[i-2] + stair[i])
// 점화식만 세우면 된다!!
//dp[0] , dp[1], dp[2], dp[3] 각각 max가 0 인경우 1 인경우 2, 3 인경우를 가정해서 생각해야한다.
// 전체를 놓고 보지 말고 짤라가지고 그 때 그때 가능한 경우를 체크하자!

dp[0] = stairs[0];
dp[1] = Math.max(stairs[1], stairs[0] + stairs[1]);
dp[2] = Math.max(
  // stairs[0] + stairs[1], => 무조건 마지막칸을 밟아야 하니깐..
  stairs[1] + stairs[2],
  stairs[0] + stairs[2]
);

for (let i = 3; i < stairs.length; i++) {
  dp[i] = Math.max(
    dp[i - 3] + stairs[i] + stairs[i - 1],
    dp[i - 2] + stairs[i]
  );
}

console.log(dp[count - 1]);
