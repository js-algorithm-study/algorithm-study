const solution = (jobs) => {
  let answer = 0;
  let time = 0;
  let queue = [];
  const n = jobs.length;

  jobs.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  const job = jobs.shift();
  queue.push(job);

  while (jobs.length || queue.length) {
    // queue에 데이터가 있으면 다른 작업하느라 못했던 일들 소요시간 적은 순으로 진행
    if (queue.length) {
      queue.sort((a, b) => a[1] - b[1]);
      const [start, cost] = queue.shift();
      // 현재 시간이 작업 시작시간보다 큰경우 (현재 시간은 5인데 작업 시작은 3) => 시간은 비용으로만 이동하고, answer는 현재 시간에서 요청한 시작 시간을 뺀 값
      if (start <= time) {
        time += cost;
        answer += time - start;
      }
      // 현재 시간이 작업 시작시간보다 작은 경우 (현재 시간은 5인데 작업 시작은 7) => 시간은 작업 시간+비용으로 이동하고, answer는 cost만큼만
      else {
        time = start + cost;
        answer += cost;
      }
      for (let i = 0; i < jobs.length; i++) {
        const [start, cost] = jobs[i];
        if (time >= start) {
          queue.push(jobs[i]);
          jobs.splice(i, 1);
          i--;
        }
      }
    }
    // queue에 데이터가 없으면 먼저 들어온 요청부터 진행
    else {
      queue.push(jobs[0]);
      jobs.splice(0, 1);
    }
  }

  return Math.floor(answer / n);
};

console.log(
  solution([
    [0, 3],
    [1, 9],
    [2, 6],
    [20, 5],
  ])
);
