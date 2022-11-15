/*
- 하드디스크는 한 번에 하나의 작업만 수행
- [작업이 요청되는 시점, 작업의 소요시간]

최대한 작업 대기 시간 + 작업 시간을 줄이려면 작업 대기 시간을 줄여야 한다.
특정 지점에서 가장 짧은 작업 시간을 가진 task부터 해치워야 함.

*/

function solution(jobs) {
  let answer = 0;
  let time = 0;
  let len = jobs.length;

  while (jobs.length > 0) {
    let taskIdx = -1; // 배열에서 뺄 작업
    let min = Infinity;
    let queueReq = 0;

    // 현재 time에서 가장 짧게 걸리는 task 선택
    for (let i = 0; i < jobs.length; i++) {
      let [req, dur] = jobs[i];

      if (req <= time) {
        if (dur < min) {
          min = dur;
          queueReq = req;
          taskIdx = i;
        }
      }
    }

    // task를 찾았으면 task 진행한 만큼 time 추가 + 대기 후 작업 시간 answer에추가
    // 없으면 time ++
    if (taskIdx >= 0) {
      jobs.splice(taskIdx, 1);
      time += min;
      // console.log(time, queueReq, min);
      answer += time - queueReq; // 기다린 시간 + 작업시간
    } else {
      time++;
    }
  }

  console.log(answer, len);

  return Math.floor(answer / len);
}

solution([
  [0, 3],
  [1, 9],
  [2, 6],
]); // 9
