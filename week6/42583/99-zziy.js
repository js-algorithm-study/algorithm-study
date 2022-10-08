function solution(bridgeLength, limitWeight, truckWeights) {
  let answer = 0;
  const len = truckWeights.length;
  // 다리 길이만큼 배열을 만듦 다리길이가 2이면 [0,0]
  const crossingTruck = Array.from({ length: bridgeLength }).fill(0);
  const crossedTruck = [];
  let i = 0;

  // 다리를 건넌 트럭이 원래 트럭의 길이와 같을때 까지 반복
  while (crossedTruck.length !== len) {
    // 한바퀴 돌때 1초씩 소요
    answer++;

    // 1초 지날때마다 건너는중인 트럭에서 맨 앞(다리의 끝) 가져와서 0이 아니면 다리를 건넌 트럭에 넣어줌
    const truck = crossingTruck.shift();
    if (truck) {
      crossedTruck.push(truck);
    }

    // 다리를 건너는중의 트럭의 무게와 새로 투입될 트럭의 무게의 합이 limit 보다 작다면
    // 다리를 건너는중의 스택에 넣어주고, 아니면 빈값인 0을 넣어줌
    let totalWeight = crossingTruck.reduce((acc, cur) => acc + cur, 0);
    if (totalWeight + truckWeights[i] <= limitWeight) {
      crossingTruck.push(truckWeights[i]);
      i++;
    } else {
      crossingTruck.push(0);
    }
  }

  return answer;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
//console.log(solution(100, 100, [10]));
