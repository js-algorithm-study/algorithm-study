function solution(gems) {
  let set = new Set(gems);
  const totalSize = set.size;

  if (totalSize === 1) return [1, 1];

  let answer = [0, Infinity];

  let lp = 0;
  let rp = 1;
  let currentGems = [gems[lp]];
  let currentSize = new Set(currentGems).size;
  // 배열 splice가 오래걸리는듯

  // let currentGems = { [gems[lp]]: 1 };
  // let currentSize = 1;
  // object로 변경?
  // Object도 keys때문에 시간초과..?

  while (rp <= gems.length) {
    console.log('size', currentSize, totalSize);
    if (currentSize === totalSize) {
      currentGems.splice(0, 1);
      currentSize = new Set(currentGems).size;
      if (totalSize > currentSize) {
        if (answer[1] - answer[0] > rp - lp) answer = [lp, rp];
        lp += 1;
        continue;
      }
      lp += 1;
    } else {
      currentGems.push(gems[rp]);
      currentSize = new Set(currentGems).size;
      rp += 1;
      console.log(lp, rp);
      console.log(currentGems);
    }
  }

  answer[0] += 1;
  return answer;
}

console.log(solution(['A', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'B', 'A']));
