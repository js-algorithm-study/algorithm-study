const solution = (n, stations, w) => {
  let answer = 0;
  let arr = [0, ...stations];

  for (let i = 0; i < arr.length; i++) {
    let gap = 0;
    if (i === 0) {
      gap = arr[i + 1] - w - 1;
    } else if (i === arr.length - 1) {
      gap = n - arr[i] - w;
    } else {
      gap = arr[i + 1] - w - (arr[i] + w + 1);
    }

    if (gap > 0) answer += Math.ceil(gap / (2 * w + 1));
  }

  return answer;
};

console.log(solution(16, [9], 2));
console.log(solution(11, [4, 11], 1));
