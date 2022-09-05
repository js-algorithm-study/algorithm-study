function solution(queue1, queue2) {
  let answer = 0;

  let firstTotal = queue1.reduce((a, c) => a + c, 0);
  let secondTotal = queue2.reduce((a, c) => a + c, 0);

  const total = firstTotal + secondTotal;
  const target = total / 2;

  let max = queue1.length;

  let firstIndex = 0;
  let secondIndex = 0;

  while (firstIndex < max || secondIndex < max) {
    if (firstTotal > target) {
      // queue1에서 pop
      // pop하면 index를 늘려줌
      // 한 큐의 원소를 모두 pop하게되면 index는 max를 넘어감
      const popped = queue1[firstIndex];
      queue2.push(popped);
      firstIndex += 1;
      firstTotal -= popped;
    } else if (firstTotal < target) {
      // queue2에서 pop
      const popped = queue2[secondIndex];
      queue1.push(popped);
      secondIndex += 1;
      firstTotal += popped;
    } else if (firstTotal === target) {
      return answer;
    }

    answer += 1;
  }

  return -1;
}
