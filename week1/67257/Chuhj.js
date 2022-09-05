function solution(expression) {
  let answer = 0;
  const nums = [];
  const operators = [];

  // 숫자와 연산자를 나눠 배열에 넣음
  let num = '';
  for (const char of expression) {
    if (char === '+' || char === '-' || char === '*') {
      operators.push(char);
      nums.push(Number(num));
      num = '';
      continue;
    }
    num += char;
  }
  nums.push(Number(num));

  let operatorsSet = [...new Set(operators)]; // 중복제거

  const permutations = getPermutations(operatorsSet, operatorsSet.length);

  for (const priority of permutations) {
    const numsCopy = [...nums];
    const operatorsCopy = [...operators];
    for (const operator of priority) {
      // 우선순위의 연산자를 순회
      let index = operatorsCopy.indexOf(operator);

      while (index !== -1) {
        // 우선순위에 해당하는 연산을 다 수행할 때까지 계산을 해나감
        if (operatorsCopy[index] === operator) {
          numsCopy[index] = calculate(operatorsCopy[index], numsCopy[index], numsCopy[index + 1]);
          numsCopy.splice(index + 1, 1);
          operatorsCopy.splice(index, 1);
        }
        index = operatorsCopy.indexOf(operator);
      }
    }
    // 우선순위에 따라 계산을 끝내면 answer와 계산값의 절대값을 비교해 큰 것으로 업데이트
    answer = Math.max(answer, Math.abs(numsCopy[0]));
  }
  return answer;
}

function calculate(oper, a, b) {
  if (oper === '+') return a + b;
  if (oper === '-') return a - b;
  if (oper === '*') return a * b;
}

function getPermutations(array, selectNum) {
  const result = [];
  if (selectNum === 1) return array.map((v) => [v]);

  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, selectNum - 1);
    result.push(...permutations.map((v) => [fixed, ...v]));
  });
  return result;
}
