/* 
괄호 개수는 맞지만 짝이 맞지 않다.

모든 괄호를 뽑아서 순서대로 배치된 괄호 문자열 알려주기

'(', ')'의 개수가 같다면 : 균형잡인 괄호 문자열 (balanced)
'(', ')'의 짝도 맞다면 : 올바른 괄호 문자열 (correct)

균형잡힌 문자열 p => return 올바른 문자열 
*/

function solution(p) {
  let answer = "";

  answer = recursive(p);

  console.log(answer);

  return answer;
}

function recursive(p) {
  // 1. 입력이 빈 문자열이면 빈 문자열 return
  if (p === "") {
    return "";
  }

  // 2. w를 "군형잡인 괄호 문자열" u, v로 분리
  let leftBracket = 0;
  let rightBracket = 0;
  let u = "";
  let v = "";

  for (let i = 0; i < p.length; i++) {
    const bracket = p[i];
    if (bracket === "(") {
      leftBracket += 1;
    }
    if (bracket === ")") {
      rightBracket += 1;
    }
    if (leftBracket === rightBracket) {
      u = p.slice(0, i + 1);
      v = p.slice(i + 1);
      break;
    }
  }

  console.log(u, v);

  const uCorrect = checkCorrectString(u);

  if (uCorrect) {
    // 재귀해서 u에 붙여서 반환
    return (u += recursive(v));
  } else {
    let result = "";
    result += "(";
    // v 재귀
    result += recursive(v);
    result += ")";
    // u의 첫번째, 마지막 제거 후,
    u = u.slice(1);
    u = u.slice(0, -1);
    // 나머지 문자열의 괄호 방향[( -> )] 바꾸어 붙여줌
    const uArr = u.split("");
    u = uArr.map((bracket) => revereBracket(bracket)).join("");
    result += u;
    return result;
  }
}

/**
 * stack으로 비교 '('와 ')'이 만나면 사라지게
 * @param {string} string
 * @returns true이면 올바른 string false이면 올바르지 않음
 */
function checkCorrectString(string) {
  let stack = [];
  stack.push(string[0]);

  for (let i = 1; i < string.length; i++) {
    if (stack[stack.length - 1] === "(" && string[i] === ")") {
      stack.pop();
    } else {
      stack.push;
    }
  }

  if (stack.length === 0) {
    return true;
  } else {
    return false;
  }
}

/**
 *
 * @param {string} bracket ( / )
 * @returns
 */
function revereBracket(bracket) {
  return bracket === "(" ? ")" : "(";
}

// console.log(solution("(()())()")); // "(()())()"
// console.log(solution(")(")); // "()"
// console.log(solution("()))((()")); // ()(())()
