function solution(numbers, target) {
  // dfs로 모든 경우 탐색
  let answer = 0;
  function dfs(sum, n) {
    // sum: 현재까지 더한 수의 합
    // n: 현재까지 더한 수의 개수
    if (n === numbers.length) {
      if (sum === target) answer += 1;
      return;
    }
    dfs(sum + numbers[n], n + 1);
    dfs(sum - numbers[n], n + 1);
  }

  dfs(0, 0);
  return answer;
}
