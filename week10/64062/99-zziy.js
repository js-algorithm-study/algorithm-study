const solution = (stones, k) => {
  let answer = 0;
  let left = 0;
  let right = 200000000;

  const isCross = (stones, step) => {
    let j = 0;
    for (let i = 0; i < stones.length; i++) {
      stones[i] -= step;
      if (stones[i] < 0) {
        j++;
        if (j >= k) {
          return false;
        }
      } else {
        j = 0;
      }
    }
    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (isCross([...stones], mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
};

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5], 3));
