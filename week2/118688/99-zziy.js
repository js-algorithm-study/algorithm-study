function solution(alp, cop, problems) {
  const check = Array(problems.length).fill(0);
  const queue = [];

  queue.push([0, alp, cop, 0, check, 0]);

  while (queue.length) {
    let [index, currentAlp, currentCop, totalTime, check, sovleCount] =
      queue.shift();

    const tmpCheck = [...check];

    // 문제풀었는지 체크
    for (let i = 0; i < problems.length; i++) {
      const [alp, cop] = problems[i];
      if (!tmpCheck[i] && currentAlp >= alp && currentCop >= cop) {
        tmpCheck[i] = 1;
        sovleCount++;
      }
    }

    console.log(index, currentAlp, currentCop, totalTime, tmpCheck, sovleCount);

    if (sovleCount === problems.length) return totalTime;

    // 코딩테스트 1 증가
    queue.push([
      index + 1,
      currentAlp,
      currentCop + 1,
      totalTime + 1,
      tmpCheck,
      sovleCount,
    ]);

    // 알고리즘 1 증가
    queue.push([
      index + 1,
      currentAlp + 1,
      currentCop,
      totalTime + 1,
      tmpCheck,
      sovleCount,
    ]);

    // 문제풀이로 증가
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
  solution(0, 0, [
    [0, 0, 2, 1, 2],
    [4, 5, 3, 1, 2],
    [4, 11, 4, 0, 2],
    [10, 4, 0, 4, 2],
  ])
);
