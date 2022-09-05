function solution(numbers, target) {
  let answer = 0;
  function dfs(v, sum) {
    if (v > numbers.length) return;
    if (v === numbers.length && target === sum) {
      return answer++;
    }
    dfs(v + 1, sum + numbers[v]);
    dfs(v + 1, sum - numbers[v]);
  }

  dfs(0, 0);
  return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3));
