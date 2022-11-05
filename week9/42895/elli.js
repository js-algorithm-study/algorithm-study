/*

N과 number을 가지고 사칙연산만 가지고 표현할 수 있는 방법 중 N을 최소 사용하는 최솟값

5를 1개 사용 ... 2개 사용 ... 3개 사용 ... 4개 사용 ... 8개 사용
여기에서 number를 찾을 수 있으면 된다~

      dp[3] = dp[2] (+-\* %) dp[1] + 555
      dp[4] = dp[3] (+-\* %) dp[1] , dp[2] (+-\* %) dp[2], dp[3][1] + 5555

*/

function solution(N, number) {
  var answer = -1;

  let dp = new Array(9).fill([]);
  dp[0] = [];

  for (let i = 1; i <= 8; i++) {
    if (i === 1) {
      dp[i] = [N];

      if (dp[i].includes(number)) {
        console.log("answer", i);
        answer = i;
        break;
      }
    } else if (i === 2) {
      dp[i] = [sameNum(N, 2), N + N, N - N, N * N, N / N];

      if (dp[i].includes(number)) {
        console.log("answer", i);
        answer = i;
        break;
      }
    } else {
      dp[i] = [];
      for (let k = 1; k < i; k++) {
        console.log(k, i - k);
        dp[i] = [...dp[i], ...calculate(dp[k], dp[i - k])];
      }

      dp[i].push(sameNum(N, i));

      // console.log(i, dp[i]);

      if (dp[i].includes(number)) {
        console.log("answer", i);
        answer = i;
        break;
      }

      // console.log(dp[i], i);
    }
  }

  return answer;
}

function calculate(x, y) {
  let ans = [];

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
      let a = x[i];
      let b = y[j];

      // @ts-ignore
      ans.push(a + b, a - b, a * b, parseInt(a / b), b - a, parseInt(b / a));
    }
  }

  // 중복제거
  let set = new Set(ans);
  return Array.from(set);
}

function sameNum(N, count) {
  let num = "";
  for (let i = 0; i < count; i++) {
    num += String(N);
  }
  return Number(num);
}

// solution(5, 12); // 4
// solution(2, 11); // 3
// solution(5, 5); // 1
solution(3, 27); // 3
