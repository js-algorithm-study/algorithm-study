const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
input = input.split('\n');

const array = input[1].split(' ').map(v => Number(v));

// https://laboputer.github.io/ps/2018/02/13/dynamic-programming/ 참고
// dp[n] == n까지의 증가하는 부분 수열의 최대 길이
// 1 <= i < array.length
// 0 <= j < n 기존 순열의 순서를 유지해야 하기 때문에 j 는 i 미만까지의 인덱스만 순회하고
// 증가하는 순열이기 때문에 array[j] < array[i] 인 곳에서 dp[i] = max(dp[i], dp[j] + 1)

function solution(array) {
  const dp = Array(array.length).fill(1);

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] < array[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }

  console.log(Math.max(...dp));
}

solution(array);
