const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
input = input.split('\n');

const n = Number(input[0]);
const array = input.slice(1).map((v) => Number(v));

function solution(array, n) {
  // i 까지의 최대값 = i 포도주 + i - 1 포도주 + i -3까지의 최대값
  //                = i 포도주 + i - 2까지의 최대값
  // 위의 식은 중간에 한 번만 안먹음

  // 두 번 안먹을 수도 있다. 세 번은? 세 번 안먹으면 무조건 손해
  // 100, 200, 2, 1, 9, 100
  let dp = Array(array.length).fill(0);

  dp[0] = array[0];
  dp[1] = Math.max(array[0] + array[1], array[1]);
  dp[2] = Math.max(array[0] + array[2], array[1] + array[2]);

  for (let i = 3; i < dp.length; i++) {
    // dp[i - 2] - array[i - 2] + array[i - 1] + array[i] // 두 번 안먹는 경우
    dp[i] = Math.max(dp[i - 2] + array[i], dp[i - 3] + array[i - 1] + array[i], dp[i - 2] - array[i - 2] + array[i - 1] + array[i]);
  }

  if (n === 1) {
    console.log(dp[0]);
  } else if (n === 2) {
    console.log(dp[1]);
  } else {
    console.log(Math.max(...dp));
  }
}

solution(array, n);
