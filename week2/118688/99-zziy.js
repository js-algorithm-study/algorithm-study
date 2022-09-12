function solution(alp, cop, problems) {
  const check = Array(problems.length).fill(0);
  const queue = [];

  queue.push([0, alp, cop, 0, check, 0]);

  while (queue.length) {
    let [index, currentAlp, currentCop, totalTime, check, sovleCount] =
      queue.shift();
    const tmpCheck = [...check];

    for (let i = 0; i < problems.length; i++) {
      const [alp, cop, incAlp, incCop, time] = problems[i];
      // 푼 문제들
      if (!tmpCheck[i] && currentAlp >= alp && currentCop >= cop) {
        currentAlp += incAlp;
        currentCop += incCop;
        totalTime += time;
        tmpCheck[i] = 1;
        sovleCount++;
      }
    }
    // console.log(index, currentAlp, currentCop, totalTime, tmpCheck, sovleCount);

    if (sovleCount === problems.length) return totalTime;

    queue.push([
      index + 1,
      currentAlp,
      currentCop + 1,
      totalTime + 1,
      tmpCheck,
      sovleCount,
    ]);

    queue.push([
      index + 1,
      currentAlp + 1,
      currentCop,
      totalTime + 1,
      tmpCheck,
      sovleCount,
    ]);

    for (let i = 0; i < problems.length; i++) {
      const [, , incAlp, incCop, time] = problems[i];
      // 푼 문제들
      if (tmpCheck[i]) {
        queue.push([
          index + 1,
          currentAlp + incAlp,
          currentCop + incCop,
          totalTime + time,
          tmpCheck,
          sovleCount,
        ]);
      }
    }
  }
}

console.log(
  solution(10, 10, [
    [10, 15, 2, 1, 2],
    [20, 20, 3, 3, 4],
  ])
);
