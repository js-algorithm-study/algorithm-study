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

*/

function solution(playTime, advTime, logs) {
  let answer = 0;
  let ansStart = 0;

  // advTime이 들어갈 수 있는.
  let possibleTimes = [0, changeTime(playTime) - changeTime(advTime)];

  let changedLogs = logs.map((log) => {
    const [start, end] = log.split("-");
    return [changeTime(start), changeTime(end)];
  });

  let target = [0, ...changedLogs.map((a) => a[0]), possibleTimes[1]].sort(
    (a, b) => a - b
  );

  // 각 logs들의 시작 + possibleTimes 점검
  for (let j = 0; j < target.length; j++) {
    const start = target[j];

    if (start > possibleTimes[1]) break; // 의미 없는 시간대

    const t = calculateTime(start, changeTime(advTime), changedLogs);
    if (t > answer) {
      answer = t;
      ansStart = start;
    }
  }

  console.log(answer, ansStart, changeTimeString(ansStart), "ans");

  return changeTimeString(ansStart);
}

function calculateTime(advStartTime, advDuration, changedLogs) {
  let time = 0;

  // console.log("asvStart", advStartTime, changeTimeString(advStartTime));

  for (let i = 0; i < changedLogs.length; i++) {
    const [logStart, logEnd] = changedLogs[i];
    const advStart = advStartTime;
    const advEnd = advStartTime + advDuration;

    if (
      (logStart <= advStart && advStart <= logEnd) ||
      (logStart <= advEnd && advEnd <= logEnd)
    ) {
      const start = Math.max(advStartTime, logStart);
      const end = Math.min(advStartTime + advDuration, logEnd);

      time = time + end - start;
    }
  }

  return time;
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

// solution("02:03:55", "00:14:15", [
//   "01:20:15-01:45:14",
//   "00:40:31-01:00:00",
//   "00:25:50-00:48:29",
//   "01:30:59-01:53:29",
//   "01:37:44-02:02:30",
// ]); // "01:30:59"

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

solution("25:00:00", "00:01:00", ["24:00:01-25:00:00"]); //"24:00:01"
