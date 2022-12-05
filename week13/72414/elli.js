// @ts-nocheck
/*
#문제 요약 
- 시청자들의 누적 재생시간이 가장 많이 나오는 곳에 공익광고를 삽입
- 공익광고가 들어갈 시작 시각을 구해서 return
- 누적 재생시간이 가장 많은 곳이 여러 곳이라면, 그 중에서 가장 빠른 시작 시각

#고민
- 최대한 많이 겹치는 곳?
- 각 시청자들의 시작 시간
- 최대한 많이 겹치더라고 오래 시청하지 않는 다면, 별로 의미가 없음.

일단, HH:MM:SS => 시간으로 변경

#해답
- 시작만 체크한다는 점은 맞으나, for문을 돌면서 시작 시간을 넣고 하나씩 체크하는 것이 아니라, 
시작과 끝 시간을 담은 배열을 만들어서 해당 구간에 몇 명이 들어있는지 체크한다. 

#Imos 알고리즘

누적합의 개념을 모르다보니 접근하기 어려웠다..ㅠㅜ

- https://velog.io/@longroadhome/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-LV.3-%EA%B4%91%EA%B3%A0-%EC%82%BD%EC%9E%85-JS

*/

function solution(playTime, advTime, logs) {
  let answer = 0;
  let time = 0;

  const playTimeNum = changeTime(playTime);
  const advTimeNum = changeTime(advTime);
  const imos = Array(playTimeNum + 1).fill(0);

  if (playTime === advTime) {
    return "00:00:00";
  }

  // imos는 00:00:00 ~ playTime 까지 매 초마다 0을 지는 array
  for (let i = 0; i < logs.length; i++) {
    const [start, end] = logs[i].split("-");
    const s = changeTime(start);
    const e = changeTime(end);

    // 각 시작, 종료 시각마다 ++, --
    imos[s]++;
    imos[e]--;
  }

  // imos : 시작 +1, 종료 -1 상태

  // 해당 시간에 겹친 유저 누적합
  for (let i = 1; i <= playTimeNum; i++) {
    imos[i] += imos[i - 1];
  }

  // imos : 현재 시각에 몇명 들어있는지

  // 누적된 광고 시간의 누적합의 누적합
  for (let i = 1; i <= playTimeNum; i++) {
    imos[i] += imos[i - 1];
  }

  // imos : 현재 시각에 몇명 * 1초의 합

  let sum = imos[advTimeNum - 1];
  console.log(imos[advTimeNum]);

  // advTimeNum부터 시작이유 : 0~advTime까지 광고인 경우.
  for (let i = advTimeNum - 1; i < playTimeNum; i++) {
    // [3~5] = [0~5] - [0~(5-3)];
    const aT = imos[i] - imos[i - advTimeNum];

    if (sum < aT) {
      sum = aT;
      time = i - advTimeNum + 1; // 시작시간 포함
    }
  }

  console.log(time, changeTimeString(time));

  return changeTimeString(time);
}

/**
 *
 * @param {string} time
 * @returns HH:MM:SS => Second
 */
function changeTime(time) {
  const [HH, MM, SS] = time.split(":");

  return Number(HH) * 60 * 60 + Number(MM) * 60 + Number(SS);
}

/**
 *
 * @param {number} time
 */
function changeTimeString(time) {
  let hour = Math.floor(time / 3600);
  let minute = Math.floor((time - hour * 3600) / 60);
  let second = time - hour * 3600 - minute * 60;

  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  return `${hour}:${minute}:${second}`;
}

solution("02:03:55", "00:14:15", [
  "01:20:15-01:45:14",
  "00:40:31-01:00:00",
  "00:25:50-00:48:29",
  "01:30:59-01:53:29",
  "01:37:44-02:02:30",
]); // "01:30:59"

// solution("99:59:59", "25:00:00", [
//   "69:59:59-89:59:59",
//   "01:00:00-21:00:00",
//   "79:59:59-99:59:59",
//   "11:00:00-31:00:00",
// ]); // "01:00:00"

// solution("50:00:00", "50:00:00", [
//   "15:36:51-38:21:49",
//   "10:14:18-15:36:51",
//   "38:21:49-42:51:45",
// ]); // "00:00:00"
