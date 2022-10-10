function solution(word) {
  const chars = ['A', 'E', 'I', 'O', 'U'];
  let dictionary = [];

  for (let i = 1; i < 6; i++) {
    const combinations = getCombinations(chars, i);
    for (comb of combinations) {
      dictionary.push(comb.join(''));
    }
  }

  dictionary.sort((a, b) => {
    if (a > b) return 1;
    return -1;
  });

  return dictionary.findIndex(v => v === word) + 1;
}

function getCombinations(array, num) {
  const result = [];
  if (num === 1) return array.map(v => [v]);

  array.forEach((fixed, index, origin) => {
    const combinations = getCombinations(origin, num - 1);
    result.push(...combinations.map(v => [fixed, ...v]));
  });

  return result;
}

console.log(solution('AAAAE'));
console.log(solution('AAAE'));
console.log(solution('I'));
console.log(solution('EIO'));
