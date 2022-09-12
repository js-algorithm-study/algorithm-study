function solution(n, info) {
  let answer = Array(11).fill(0);
  let max = 0;

  function dfs(v, apeachSum, ryanSum, remain, tmpAnswer) {
    if (remain < 0) return;

    // 11개 양궁 쏘았을 때
    if (v > 10) {
      // 최대 점수차일 때
      if (ryanSum - apeachSum > max) {
        tmpAnswer[10] = remain;
        max = ryanSum - apeachSum;
        answer = [...tmpAnswer];
      }

      // 점수차가 같을때 => 낮은 점수 비교
      if (ryanSum - apeachSum === max) {
        for (let i = 10; i > 0; i--) {
          if (answer[i] > tmpAnswer[i]) {
            break;
          }
          if (answer[i] < tmpAnswer[i]) {
            answer = [...tmpAnswer];
            break;
          }
        }
      }
      return;
    }

    // 라이언이 이긴경우와 그렇지 않은 경우 (비기거나 지거나) dfs

    // 라이언이 이긴 경우
    let arr = [...tmpAnswer];
    arr[v] = info[v] + 1;
    dfs(v + 1, apeachSum, ryanSum + 10 - v, remain - info[v] - 1, arr);

    // 라이언이 이기지 않은 경우
    // 0이상이면 어피치가 이긴경우, 0이면 비긴경우
    if (info[v] > 0) {
      dfs(v + 1, apeachSum + 10 - v, ryanSum, remain, tmpAnswer);
    } else {
      dfs(v + 1, apeachSum, ryanSum, remain, tmpAnswer);
    }
  }

  dfs(0, 0, 0, n, answer);

  return max === 0 ? [-1] : answer;
}

// 1) 10+ 9 + // 8 +

console.log(solution(3, [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0]));
