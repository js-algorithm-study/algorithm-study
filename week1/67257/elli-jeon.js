/* 
숫자 + 3가지 연산문자(+, -, *)로 이루어진 수식 => 연산자의 우선 순위를 지정해서 만들 수 있는 가장 큰 수

그래프 순위 탐색? 스택으로? 
가능한 경우 체크하는 걸로 순서대로.

*/

function solution(expression) {
  let answer = 0;

  // 1. 해당 기호들로 가능한 순열 조합
  const possible = getPermutation(["+", "-", "*"], 3);

  //console.log(possible);

  possible.forEach((arr) => {
    let numbersArr = expression.split(/\+|\-|\*/);
    let signsArr = expression.split(/\d/).filter((ele) => ele);

    // 2. sign조합 돌려서 확인
    arr.forEach((sign) => {
      const result = removeSign(sign, numbersArr, signsArr);
      numbersArr = result[0];
      signsArr = result[1];
    });

    if (answer < Math.abs(numbersArr[0])) {
      answer = Math.abs(numbersArr[0]);
    }
  });

  //console.log(answer);

  return answer;
}

/**
 * @param {array} array array
 * @param {number} selectNum 고를 수
 * @returns 가능한 모든 순열 조합
 */
function getPermutation(array, selectNum) {
  const result = [];

  if (selectNum === 1) {
    return array.map((ele) => [ele]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];

    const permutation = getPermutation(rest, selectNum - 1);

    const attached = permutation.map((ele) => [fixed, ...ele]);

    result.push(...attached);
  });

  return result;
}

/**
 *
 * O^2
 * @param {string} sign + - *
 * @param {array} numbersArr 숫자 array
 * @param {array} signsArr 기호 array
 * @returns 특정 기호를 찾으면 array에서 앞 뒤 숫자와 기호를 제거한 array return
 */
function removeSign(sign, numbersArr, signsArr) {
  // 3. while문으로 sign이 array안에 있는 동안 계속 돌려서
  while (signsArr.includes(sign)) {
    // 4. 해당 sign 찾으면, sign의 앞뒤 숫자 찾아서 sign하고 계산해서 다시 집어 넣음
    for (let i = 0; i < numbersArr.length + signsArr.length; i++) {
      const share = Math.floor(i / 2);
      const remainder = i % 2;

      if (remainder === 1 && signsArr[share] === sign) {
        //console.log(numbersArr[share], signsArr[share], numbersArr[share + 1]);
        const newNumber = calculate(
          signsArr[share],
          numbersArr[share],
          numbersArr[share + 1]
        );

        signsArr = [...signsArr.slice(0, share), ...signsArr.slice(share + 1)];
        numbersArr = [
          ...numbersArr.slice(0, share),
          newNumber,
          ...numbersArr.slice(share + 2),
        ];
        break;
      }
    }
  }

  return [numbersArr, signsArr];
}

/**
 *
 * @param {string} sign - + *
 * @param {number} first
 * @param {number} second
 * @returns first + or - * second
 */
function calculate(sign, first, second) {
  switch (sign) {
    case "-":
      return Number(first) - Number(second);
    case "+":
      return Number(first) + Number(second);
    case "*":
      return Number(first) * Number(second);
  }
}

solution("100-200*300-500+20"); // * > + > - => 60420
solution("50*6-3*2"); // - > * => 300
