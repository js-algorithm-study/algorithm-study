const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString();
input = input.split('\n');

const T = Number(input[0]);
const testCases = [];
let testCase = { n: 0, array: [] };

for (let i = 1; i <= T * 3; i++) {
  if ((i - 1) % 3 === 0) {
    if (i !== 1) {
      testCases.push(testCase);
    }
    testCase = { n: 0, array: [] };
    testCase.n = Number(input[i]);
  } else {
    testCase.array.push(input[i].split(' ').map(v => Number(v)));
  }
}
testCases.push(testCase);

function solution(testCases) {
  // https://yabmoons.tistory.com/54 참고
  // 50 10 100 20 40
  // 30 50 70  10 60
  // array[0][0] or array[1][0] 부터 시작해서 한 열씩 순회
  // 위 또는 아래 스티커를 선택
  // dp[0][i] = Math.max(dp[1][i - 1] + array[0][i], dp[1][i - 2] + array[0][i])
  // dp[1][i] = Math.max(dp[0][i - 1] + array[1][i], dp[0][i - 2] + array[1][i])

  for (const testCase of testCases) {
    const { n, array } = testCase;
    let dp = Array(2)
      .fill()
      .map(() => Array(n).fill(0));

    dp[0][0] = array[0][0];
    dp[1][0] = array[1][0];
    dp[0][1] = array[1][0] + array[0][1];
    dp[1][1] = array[0][0] + array[1][1];

    for (let i = 2; i < n; i++) {
      dp[0][i] = Math.max(dp[1][i - 1] + array[0][i], dp[1][i - 2] + array[0][i]);
      dp[1][i] = Math.max(dp[0][i - 1] + array[1][i], dp[0][i - 2] + array[1][i]);
    }
    console.log(Math.max(dp[0][n - 1], dp[1][n - 1]));
  }
}

solution(testCases);
