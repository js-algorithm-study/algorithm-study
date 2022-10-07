function solution(bridge_length, weight, truck_weights) {
  // 모든 트럭이 건너갈 때 까지 반복
  // [0, 0]
  // shift <- [0, 7] <- push
  // [7, 0]
  // [0, 4]
  let answer = 0;
  let bridge = Array(bridge_length).fill(0);
  let crossCount = 0;
  let index = 0; // 다리위로 올라갈 차례의 트럭의 index

  while (crossCount < truck_weights.length) {
    if (bridge.reduce((acc, cur) => acc + cur, 0) + truck_weights[index] <= weight) {
      // 트럭을 다리위로 올릴 수 있다면 올림
      bridge.push(truck_weights[index]);
      const cross = bridge.shift();
      if (cross > 0) {
        crossCount += 1;
      }
      index += 1;
      answer += 1;
    }

    bridge.push(0);
    const cross = bridge.shift();
    if (cross > 0) {
      // 트럭이 다리를 건너가면
      crossCount += 1;
    }
    answer += 1;

    if (bridge.reduce((acc, cur) => acc + cur, 0) + truck_weights[index] <= weight) {
      bridge[bridge_length - 1] = truck_weights[index];
      index += 1;
    }
  }

  return answer;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
console.log(solution(100, 100, [10]));
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
