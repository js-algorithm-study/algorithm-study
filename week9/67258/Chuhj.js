function solution(gems) {
  let set = new Set(gems);
  const totalSize = set.size;

  if (totalSize === 1) return [1, 1];

  let answer = [0, Infinity];

  let lp = 0;
  let rp = 1;

  // let currentGems = [gems[lp]];
  // let currentSize = new Set(currentGems).size;

  // let currentGems = { [gems[lp]]: 1 };
  // let currentSize = 1;

  let currentGems = new Map();
  currentGems.set(gems[0], 1);

  while (rp <= gems.length) {
    if (currentGems.size === totalSize) {
      // 현재 고른 보석이 모든 보석을 포함하면
      // 현재 고른 보석들 중에 앞쪽 하나를 뺴면서
      // lp를 늘려줌
      if (answer[1] - answer[0] > rp - lp) answer = [lp, rp];

      currentGems.set(gems[lp], currentGems.get(gems[lp]) - 1);
      if (currentGems.get(gems[lp]) === 0) currentGems.delete(gems[lp]);

      lp += 1;
    } else {
      // 현재 고른 보석이 모든 보석을 포함하지 못했으면
      // rp에 있는 보석을 하나 추가해주고
      // rp를 늘려줌
      currentGems.set(gems[rp], currentGems.get(gems[rp]) + 1 || 1);
      rp += 1;
    }
  }

  answer[0] += 1;
  return answer;
}
