/* 
dp에서 행 또는 열은 경우의 수를 나타낸다.

n가지 종류의 동전. 합 k 
순서가 다른 경우는 같다! (조합)

1, 2, 3 => 10

5 * 0 + (10 - 1,2) => dp[i-1]
5 * 1 + (5 - 1,2) => 
5 * 2 => 1



*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "../test.txt";

// let input = fs.readFileSync(path).toString().split(" ");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

let target = Number(inputs[0].split(" ")[1]);
inputs.shift();

let coins = inputs.map((ele) => Number(ele));

// console.log(target, coins);

let dp = new Array(target + 1).fill(0);
dp[0] = 1;

for (let i = 0; i < coins.length; i++) {
  for (let j = coins[i]; j <= target; j++) {
    dp[j] += dp[j - coins[i]];
  }
}
console.log(dp[target]);
