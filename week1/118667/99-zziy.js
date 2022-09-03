function solution(queue1, queue2) {
  let answer = 0;
  const sum1 = queue1.reduce((acc, cur) => acc + cur, 0);
  const sum2 = queue2.reduce((acc, cur) => acc + cur, 0);
  const queue = [...queue1, ...queue2];
  const half = (sum1 + sum2) / 2;

  let lt = 0;
  let rt = queue1.length - 1;
  let sum = queue1.reduce((acc, cur) => acc + cur, 0);

  while (rt < queue.length) {
    if (sum === half) {
      return answer;
    } else if (sum > half) {
      sum -= queue[lt++];
      answer++;
    } else if (sum < half) {
      sum += queue[++rt];
      answer++;
    }
  }

  return -1;
}

console.log(solution([3, 2, 7, 2], [4, 6, 5, 1]));
