const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
input = input.split('\n');

const n = Number(input[0]);
const array = input.slice(1).map((v) => Number(v));

function solution(array, n) {
  // 마지막 계단을 반드시 밟아야 함.
  // 마지막 계단(i)을 밟는 경우: i - 2 까지의 최대값 + i 계단
  //                           i - 3 까지의 최대값 + i - 1 계단 + i 계단

  let dp = Array(array.length).fill(0);

  dp[0] = array[0];
  dp[1] = Math.max(array[0] + array[1], array[1]);
  dp[2] = Math.max(array[0] + array[2], array[1] + array[2]);

  for (let i = 3; i < dp.length; i++) {
    dp[i] = Math.max(dp[i - 2] + array[i], dp[i - 3] + array[i - 1] + array[i]);
  }

  console.log(dp);
  console.log(dp[n - 1]);
}

solution(array, n);
