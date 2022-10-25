let input = require("fs")
  .readFileSync("week8/99-zziy.txt")
  .toString()
  .trim()
  .split("\n");

const n = input[0];

const solution = (n, arr) => {
  let dp = Array.from(Array(2), () => Array(n).fill(0));
  dp[0][0] = arr[0][0];
  dp[1][0] = arr[1][0];
  dp[0][1] = arr[1][0] + arr[0][1];
  dp[1][1] = arr[0][0] + arr[1][1];

  for (let i = 2; i < n; i++) {
    dp[0][i] = Math.max(dp[1][i - 1], dp[1][i - 2]) + arr[0][i];
    dp[1][i] = Math.max(dp[0][i - 1], dp[0][i - 2]) + arr[1][i];
  }
  return Math.max(dp[0][n - 1], dp[1][n - 1]);
};

for (let i = 0; i < n; i++) {
  const arr = input[i * 3 + 2].split(" ").map((v) => +v);
  const arr2 = input[i * 3 + 3].split(" ").map((v) => +v);
  console.log(solution(Number(input[i * 3 + 1]), [arr, arr2]));
}
