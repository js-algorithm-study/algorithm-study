const solution = (n, arr) => {
  let dp = Array.from({ length: n }, () => 0);
  dp[1] = arr[0];
  dp[2] = arr[0] + arr[1];

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(
      dp[i - 3] + arr[i - 2] + arr[i - 1],
      dp[i - 2] + arr[i - 1],
      dp[i - 1]
    );
  }
  return dp[n];
};

const [n, ...wine] = require("fs")
  .readFileSync("week8/99-zziy.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);
console.log(solution(n, wine));
