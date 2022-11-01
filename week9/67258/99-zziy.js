function solution(gems) {
  let answer = [0, 100000000];
  const set = new Set(gems);
  const gemList = [...set];
  let gemMap = new Map();
  let left = 0;
  let right = 0;

  while (left <= right && right < gems.length && left >= 0) {
    // 보석을 다 담은거면 left를 증가시켜 최소 길이로 만들기
    if (gemMap.size === gemList.length) {
      const [start, end] = answer;
      if (end - start > right - left) {
        answer = [left + 1, right + 1];
      }
      const gem = gems[left];
      const gemCount = gemMap.get(gem);
      if (gemCount === 1) {
        gemMap.delete(gem);
      } else {
        gemMap.set(gem, gemCount - 1);
      }
      left++;
    }
    // 보석을 다 못담은거면 right에 있던 보석 담기
    else {
      const gem = gems[right];
      if (gemMap.has(gem)) {
        gemMap.set(gem, gemMap.get(gem) + 1);
      } else {
        gemMap.set(gem, 1);
      }
    }
    // 다시 한번 확인해서 보석을 다 못담은 거면 right를 증가시켜 보석을 다 담도록 하기
    if (gemMap.size !== gemList.length) {
      right++;
    }
  }

  return answer;
}

console.log(
  solution([
    "DIA",
    "RUBY",
    "DIA",
    "EMERALD",
    "SAPPHIRE",
    "SAPPHIRE",
    "EMERALD",
    "DIA",
    "RUBY",
  ])
);
/* console.log(solution(["AA", "AB", "AC", "AA", "AC"]));
console.log(solution(["XYZ", "XYZ", "XYZ"]));
console.log(solution(["ZZZ", "YYY", "NNNN", "YYY", "BBB"])); */
