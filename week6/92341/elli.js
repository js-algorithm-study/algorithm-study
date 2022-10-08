// @ts-nocheck
/* 
차량별로 주차 요금을 계산 

기본 시간 / 기본 요금 / 단위 시간 / 단위 요금

입출차 기록
시각 / 차량 번호 / 내역

차량별 "누적" 시간을 요금으로 계산
출차 기록이 없으면 23:59에 출차로 간주
초과한 시간이 단위 시간으로 나누어 떨어지지 않으면 올림으로 간주

차량 번호가 작은 자동차부터 청구 요금을 배열로 reutrn

필요한 함수
1. 시간 계산. 
2. 해당 계산에 대해서 요금 계산
*/

function solution(fees, records) {
  let answer = [];

  // 현재 주차장 상태
  let parking = {};

  let accumulate = {};

  for (let i = 0; i < records.length; i++) {
    const [time, car, log] = records[i].split(" ");
    if (log === "IN") {
      parking[car] = time;
    } else if (log === "OUT") {
      if (accumulate[car]) {
        accumulate[car] += calculateTime(parking[car], time);
      } else {
        accumulate[car] = calculateTime(parking[car], time);
      }
      delete parking[car];
    }
  }

  // console.log("parking, acc");
  // console.log(parking, accumulate);
  // 이상태에서 parking에 여전히 남은 차들 정리

  for (const [car, time] of Object.entries(parking)) {
    if (accumulate[car]) {
      accumulate[car] += calculateTime(time, "23:59");
    } else {
      accumulate[car] = calculateTime(time, "23:59");
    }
  }

  // console.log("acc");
  // console.log(accumulate);

  const ans = Object.entries(accumulate)
    .sort((a, b) => a[0] - b[0])
    .map((ele) => calculateFee(fees, ele[1]));
  console.log(ans, "ans");

  return ans;

  return answer;
}

function calculateTime(timeIn, timeOut) {
  const timeInArr = timeIn.split(":");
  const timeOutArr = timeOut.split(":");

  const [inH, inM] = timeInArr;
  const [outH, outM] = timeOutArr;

  const time = (outH - inH) * 60 + (outM - inM);

  return time;
}

function calculateFee(fees, time) {
  const [basicTime, basicFee, unitTime, unitFee] = fees;

  let accumulatedTime = time;

  const isTimeOver = accumulatedTime > basicTime;

  const fee = isTimeOver
    ? basicFee + Math.ceil((accumulatedTime - basicTime) / unitTime) * unitFee
    : basicFee;

  return fee;
}

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
);

solution(
  [120, 0, 60, 591],
  [
    "16:00 3961 IN",
    "16:00 0202 IN",
    "18:00 3961 OUT",
    "18:00 0202 OUT",
    "23:58 3961 IN",
  ]
);

solution([1, 461, 1, 10], ["00:00 1234 IN"]);
