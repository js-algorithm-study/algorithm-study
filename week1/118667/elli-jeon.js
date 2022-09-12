function solution(queue1, queue2) {
  const queue = [...queue1, ...queue2];
  let answer = 0;

  const sum1 = queue1.reduce((prev, curr) => prev + curr, 0);
  const sum2 = queue2.reduce((prev, curr) => prev + curr, 0);

  const targetSum = (sum1 + sum2) / 2;

  let left = 0; // queue1 start
  let right = queue1.length - 1; // queue2 last
  let sum = queue1.reduce((prev, curr) => prev + curr, 0);

  while (right < queue.length) {
    console.log(left, right);
    if (sum === targetSum) {
      return answer;
    }
    // 충분. 버리셈
    if (sum > targetSum) {
      // 현재 가지고 있는 것을 빼야하니깐 -먼저하고 sum에 빼줌
      sum -= queue[left++];
      answer++;
    }
    // 부족함. push 필요
    if (sum < targetSum) {
      // 다음것을 넣어야 하니깐 +먼저 하고 sum에 더해줌
      sum += queue[++right];
      answer++;
    }
  }

  return -1;
}

console.log(solution([3, 2, 7, 2], [4, 6, 5, 1]));
console.log(solution([1, 2, 1, 2], [1, 10, 1, 2]));
