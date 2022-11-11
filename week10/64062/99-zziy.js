const solution = (stones, k) => {
  let answer = 0;
  let i = 0;
  let tmp = Array(stones.length).fill(0);
  let isRun = true;

  while (isRun) {
    if (stones[i] >= 1) {
      stones[i] -= 1;
      tmp[i] = 1;
      i++;
    } else {
      i++;
    }
    if (i >= stones.length) {
      for (let j = 0; j < stones.length - k; j++) {
        if (tmp.slice(j, j + k).findIndex((s) => s !== 0) === -1) {
          isRun = false;
          break;
        }
      }
      if (isRun) {
        answer++;
        i = 0;
        tmp = Array(stones.length).fill(0);
      }
    }
  }
  return answer;
};

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 9));
