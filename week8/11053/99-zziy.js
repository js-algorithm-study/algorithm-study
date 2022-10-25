let input = require("fs")
  .readFileSync("week8/99-zziy.txt")
  .toString()
  .trim()
  .split("\n");

const arr = input.slice(1).map((v) => v.split(" ").map((v) => +v));

const solution = (arr) => {
  let dp = Array.from({ length: arr.length }, () => 0);
  dp[0] = 1;

  for (let i = 1; i < arr.length; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] < arr[i] && max < dp[j]) {
        max = dp[j];
      }
    }
    dp[i] = max + 1;
  }
  return Math.max(...dp);
};

console.log(solution(arr[0]));
