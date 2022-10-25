let input = require("fs")
  .readFileSync("week8/99-zziy.txt")
  .toString()
  .trim()
  .split("\n");

const arr = input.slice(1).map((v) => +v);

const solution = (arr) => {
  /* 조건 : 1 or 2계단씩 오를 수 있고, 연속해서 1,1,1은 안된다.
   1. i-2에서 바로 i로 이동하는 경우 => dp[i-2] + arr[i] 
   2. i-1에서 i로 이동하는 경우 , 여기서는 i-2는 연속해서 1,1,1이 되기때문에 i-3에서 왔다고 가정. => dp[i-3] + arr[i] + arr[i-1]
    d[N] = max(dp[n-3] + arr[n-1] + arr[n], dp[n-2] + arr[n])
    */
  let dp = Array.from({ length: arr.length }, () => 0);
  const n = arr.length;
  dp[0] = arr[0];
  dp[1] = arr[0] + arr[1];
  dp[2] = arr[0] + arr[2] > arr[1] + arr[2] ? arr[0] + arr[2] : arr[1] + arr[2];

  for (let i = 3; i < n; i++) {
    dp[i] =
      dp[i - 3] + arr[i - 1] + arr[i] > dp[i - 2] + arr[i]
        ? dp[i - 3] + arr[i - 1] + arr[i]
        : dp[i - 2] + arr[i];
  }
  return dp[n - 1];
};

console.log(solution(arr));
