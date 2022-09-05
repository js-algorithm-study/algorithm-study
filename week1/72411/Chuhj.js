function solution(orders, course) {
  var answer = [];
  for (const num of course) {
    let count = {};
    for (const order of orders) {
      // 코스의 숫자별로 주문의 조합들을 구함
      // 코스의 숫자별로 가장 많이 나온 조합들이 정답
      let combinations = getCombinations(order.split(''), num).map((comb) => comb.sort().join(''));

      for (const comb of combinations) {
        // 메뉴 조합의 개수를 기록
        count[comb] = count[comb] + 1 || 1;
      }
    }

    let max = 0;
    for (comb in count) max = Math.max(max, count[comb]);
    for (comb in count) if (count[comb] >= 2 && count[comb] === max) answer.push(comb); // 나온 조합의 수가 2 이상이고 최대값인 것을 answer에 추가
  }
  answer.sort();
  return answer;
}

function getCombinations(array, selectNum) {
  const result = [];
  if (selectNum === 1) return array.map((v) => [v]);

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNum - 1);
    result.push(...combinations.map((v) => [fixed, ...v]));
  });
  return result;
}
