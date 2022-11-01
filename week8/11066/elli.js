// @ts-nocheck

/* 

dp[i] = dp[i-1] + minumun two of costs 가 아님. 서로 연속하는 장만 합칠 수 있음.!!

40, 30, 30

1. (40 + 30) / [(40+30, 30)]
2. (40 + 30) + (40 + 30) + 30 / [(100)]
dp[i] = dp[i-1] * 2 + costs[i]

*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "../test.txt";

// let input = fs.readFileSync(path).toString().split("\r");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

const tasks = Number(inputs[0]);

for (let a = 0; a < tasks - 1; a++) {
  let count = Number(inputs[2 * a + 1]);
  let costs = inputs[2 * a + 2].split(" ").map((ele) => Number(ele));

  let dp = new Array(count).fill(0).map(() => new Array(count).fill(0));

  // i는 chapter 개수 (a,b) (a,b,c) ...
  for (i = 2; i <= costs.length; i++) {
    if (i === 2) {
      for (let j = 0; j < costs.length; j++) {
        for (let k = 0; k < costs.length; k++) {
          if (j + 1 <= i && k + 1 <= i) {
            dp[j][k] = 1;
          }
        }
      }
    }
  }

  print(dp);

  console.log(count, costs);
}

function print(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
