const solution = (n, stations, w) => {
  let answer = 0;
  let check = Array(n).fill(0);
  let splitArr = [];
  let temp = [];

  for (let i = 0; i < stations.length; i++) {
    for (let j = stations[i] - w - 1; j <= stations[i] + w - 1; j++) {
      if (j >= 0 && j < n) {
        check[j] = 1;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (check[i] === 0) {
      temp.push(i);
    }
    if (check[i] === 1) {
      splitArr.push(temp);
      temp = [];
    }
  }
  splitArr.push(temp);

  for (let i = 0; i < splitArr.length; i++) {
    if (splitArr.length) {
      const length = Math.ceil(splitArr[i].length / (2 * w + 1));
      answer += length;
    }
  }

  return answer;
};

console.log(solution(16, [9], 2));
console.log(solution(11, [4, 11], 1));
