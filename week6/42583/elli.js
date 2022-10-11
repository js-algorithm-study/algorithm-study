/*
모든 트럭이 지나는데 걸리는 시간.
트럭이 최대 bridge_length 대수, weight까지 차지 할 수 있다.

그리디로 한 번 해볼까나.
*/

function solution(bridge_length, weight, truck_weights) {
  let time = 0;

  // 실제 bridge를 만들어서
  let bridge = new Array(bridge_length).fill(0);

  // 마지막 트럭이 나오게되는 순간 return 값에 + bridge_length 해주면 되지 않을까.
  let index = 0; // shift는 너무 부담..
  let truckIndex = 0;
  let bridgeSum = 0; // 매번 더할때마다 전체 bridge 돌면서 sum 해주면 5번 시간초과 남.

  while (truck_weights.length !== truckIndex) {
    let truck = truck_weights[truckIndex]; // 진입할 트럭

    bridgeSum -= bridge[index]; // sum에서 먼저 빼주고
    index++; // bridge에서 나감과 동시에

    // 다음진입할 트럭까지 합쳐서 무게 check
    if (bridgeSum + truck <= weight) {
      truckIndex++;
      bridgeSum += truck;
      bridge.push(truck);
    } else {
      bridge.push(0);
    }
    time++;
  }
  // console.log(index, bridge);

  // console.log(time, bridge, time + bridge_length);

  console.log("answer", time + bridge_length);
  return time + bridge_length;
}

// 이렇게 그때 그때 check하지말고!
function check(group, index, newTruck, weight) {
  let flag = true;

  let sum = newTruck;

  for (let i = 0; i < group.length; i++) {
    if (i >= index) sum += group[i];
    if (sum > weight) {
      flag = false;
      break;
    }
  }

  return flag;
}

function sum(group, index) {
  return group.reduce(
    (prev, curr, currIdx) => currIdx >= index && prev + curr,
    0
  );
}

// solution(2, 10, [7, 4, 5, 6]); // 8
// solution(100, 100, [10]); // 101
// solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]); //110

solution(5, 5, [2, 2, 2, 2, 1, 1, 1, 1, 1]); //19
