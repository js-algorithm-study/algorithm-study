function solution(play_time, adv_time, logs) {
  function getSec(time) {
    const [hours, minutes, seconds] = time.split(':').map((v) => Number(v));
    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  function getTime(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
  // play_time만큼 1초 간격으로 누적 시청자수를 기록함
  let answer = '';
  let views = new Array(getSec(play_time) + 1).fill(0);
  const advSec = getSec(adv_time);
  logs = logs.map((string) => string.split('-')).sort((a, b) => getSec(a[0]) - getSec(b[0]));

  for (const [start, end] of logs) {
    const [startSec, endSec] = [getSec(start), getSec(end)];
    for (let i = startSec; i <= endSec; i++) {
      views[i] += 1;
    }
  }

  let max = 0;
  let sum = 0;

  for (let i = 0; i <= advSec; i++) {
    sum += views[i];
  }
  max = sum;

  for (let start = 1; start <= getSec(logs[logs.length - 1][1]) - advSec + 1; start++) {
    sum -= views[start - 1];
    sum += views[start + advSec];
    if (sum > max) {
      max = sum;
      answer = start;
    }
  }

  // // log의 시작시점만 기준으로 함
  // for (const [start] of logs) {
  //   const startSec = getSec(start);

  //   let sum = 0;
  //   for (let i = startSec; i <= startSec + advSec; i++) {
  //     sum += views[i];
  //   }
  //   console.log(sum, start, max);
  //   if (sum > max) {
  //     max = sum;
  //     answer = start;
  //   }
  // }

  return getTime(answer);
}

console.log(
  solution('02:03:55', '00:14:15', ['01:20:15-01:45:14', '00:40:31-01:00:00', '00:25:50-00:48:29', '01:37:44-02:02:30', '01:30:59-01:53:29'])
);
console.log(solution('50:00:00', '42:51:45', ['15:36:51-38:21:49', '10:14:18-15:36:51', '38:21:49-42:51:45']));
