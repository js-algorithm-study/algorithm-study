// @ts-nocheck
/*
포도주 잔 선택. 비우고 제자리
3잔 연속 불가

이번에는 조건이 "무조건 마지막 수 포함" 이런 것이 아니라
"3연임 불가!" 하나 밖에 없음.

다음 3 경우

1. [~~ o o] x = dp[i-1]
2. [~~ o] x o = dp[i-2] + (n)
3. [~~] x o o = dp[i-3] + (n-1) + (n)

*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "../test.txt";

// let input = fs.readFileSync(path).toString().split(" ");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

// @ts-ignore
inputs = inputs.map((ele) => Number(ele));

let count = Number(inputs[0]);
let glasses = inputs.slice(1);

let dp = new Array(count).fill(0);

dp[0] = glasses[0];
dp[1] = glasses[0] + glasses[1];
dp[2] = Math.max(
  glasses[0] + glasses[1],
  glasses[0] + glasses[2],
  glasses[1] + glasses[2]
);

// dp[i] = Math.max(dp[i-3] + glasses[i-1] + glasses[i], dp[i-2] + glasses[i], dp[i-1])

for (let i = 3; i < count; i++) {
  dp[i] = Math.max(
    dp[i - 3] + glasses[i - 1] + glasses[i],
    dp[i - 2] + glasses[i],
    dp[i - 1]
  );
}

console.log(dp[count - 1]);
