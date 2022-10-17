function solution(fees, records) {
  // 차 번호마다 총 주차 시간을 분으로 계산
  let [baseTime, baseFee, unitTime, unitFee] = fees;

  let status = {};
  let inTimes = {};
  // status에 차 번호 별로 주차한 시간(분)을 기록
  // inTimes에 차 번호 별로 입차 시간을 기록

  for (const record of records) {
    // 주차한 시간 계산
    let [time, carNum, inOut] = record.split(' ');
    if (inOut === 'IN') {
      inTimes[carNum] = time;
      if (!status[carNum]) status[carNum] = 0;
    } else {
      // OUT 일때
      // OUT한 시간에서 IN 한 시간을 빼줌
      status[carNum] += getMinutes(time, inTimes[carNum]);
      inTimes[carNum] = null;
    }
  }

  let answer = [];

  for ([carNum, time] of Object.entries(inTimes)) {
    // 요금 계산
    if (time !== null) {
      // 출차시간이 없는 차도 시간을 계산
      status[carNum] += getMinutes('23:59', time);
    }
    answer.push([carNum, calculateFee(status[carNum])]);
  }

  answer = answer.sort((a, b) => a[0] - b[0]).map((array) => array[1]);

  function calculateFee(minutes) {
    let fee = baseFee;
    if (minutes <= baseTime) {
      return fee;
    }

    fee += Math.ceil((minutes - baseTime) / unitTime) * unitFee;
    return fee;
  }

  function getMinutes(OUT, IN) {
    let [outHours, outMinutes] = OUT.split(':').map((v) => Number(v));
    let [inHours, inMinutes] = IN.split(':').map((v) => Number(v));

    let [hoursDiffer, minutesDiffer] = [outHours - inHours, outMinutes - inMinutes];

    if (minutesDiffer < 0) {
      hoursDiffer -= 1;
      minutesDiffer += 60;
    }
    return hoursDiffer * 60 + minutesDiffer;
  }

  return answer;
}

console.log(
  solution([180, 5000, 10, 600], ['05:34 5961 IN', '06:00 0000 IN', '06:34 0000 OUT', '07:59 5961 OUT', '07:59 0148 IN', '18:59 0000 IN', '19:09 0148 OUT', '22:59 5961 IN', '23:00 5961 OUT'])
);
console.log(solution([1, 461, 1, 10], ['00:00 1234 IN']));
