function solution(fees, records) {
  let answer = [];
  let stack = [];
  const timeMap = new Map();
  const timeList = [];

  // in이면 stack에서 push, out이면 stack에서 pop하면서 timeMap에 시간 총시간 계산해서 넣어주기

  records.forEach((record) => {
    const [time, carNumber, info] = record.split(" ");
    if (info === "IN") {
      stack.push({ time, carNumber });
    }
    if (info === "OUT") {
      const newStack = [];
      while (stack.length) {
        const car = stack.pop();
        if (car.carNumber === carNumber) {
          const [inHour, inMin] = car.time.split(":");
          const [outHour, outMin] = time.split(":");
          const totalTime =
            Number(outHour) * 60 +
            Number(outMin) -
            (Number(inHour) * 60 + Number(inMin));
          if (timeMap.has(carNumber)) {
            timeMap.set(carNumber, timeMap.get(carNumber) + totalTime);
          } else {
            timeMap.set(carNumber, totalTime);
          }
          break;
        } else {
          newStack.push(car);
        }
      }
      stack = [...stack, ...newStack];
    }
  });

  // 출차안한차는 23:59분이라고 가정하고 시간계산해서 넣어주기
  if (stack.length) {
    stack.forEach((car) => {
      const [inHour, inMin] = car.time.split(":");
      const time = 23 * 60 + 59 - (Number(inHour) * 60 + Number(inMin));
      if (timeMap.has(car.carNumber)) {
        timeMap.set(car.carNumber, timeMap.get(car.carNumber) + time);
      } else {
        timeMap.set(car.carNumber, time);
      }
    });
  }

  timeMap.forEach((value, key) => {
    timeList.push({ number: key, time: value });
  });

  // 차 넘버 기준으로 sort
  timeList.sort((a, b) => Number(a.number) - Number(b.number));

  // sort 되어있으니까 시간별로 요금계산해서 answer에 넣어주기
  timeList.forEach((time) => {
    const [baseTime, baseFee, unitMin, unitFee] = fees;
    if (time.time > baseTime) {
      const extraTime = time.time - baseTime;
      answer.push(baseFee + Math.ceil(extraTime / unitMin) * unitFee);
    } else {
      answer.push(baseFee);
    }
  });

  return answer;
}

console.log(
  solution(
    [180, 5000, 10, 600],
    [
      "05:34 5961 IN",
      "06:00 0000 IN",
      "06:34 0000 OUT",
      "07:59 5961 OUT",
      "07:59 0148 IN",
      "18:59 0000 IN",
      "19:09 0148 OUT",
      "22:59 5961 IN",
      "23:00 5961 OUT",
    ]
  )
);
