function solution(jobs) {
  jobs.sort((a, b) => a[0] - b[0]);

  let answer = 0;
  let time = 0;
  const jobsLength = jobs.length;

  while (jobs.length > 0) {
    // 시작시간이 현재 시간보다 작은 애들을 찾음
    // 수행시간이 작은거부터.
    let start = -1;
    let duration = 1001;
    let deleteIndex;

    for (let i = 0; i < jobs.length; i++) {
      const [curStart, curDuration] = jobs[i];
      if (curStart <= time && curDuration < duration) {
        start = curStart;
        duration = curDuration;
        deleteIndex = i;
      }
    }

    if (start === -1) {
      time += 1;
    } else {
      time += duration;
      answer += time - start;
      jobs.splice(deleteIndex, 1);
    }
  }

  return Math.floor(answer / jobsLength);
}

console.log(
  solution([
    [0, 3],
    [1, 9],
    [2, 6],
  ])
);
console.log(
  solution([
    [0, 16],
    [0, 14],
    [15, 1],
    [13, 13],
  ])
);
