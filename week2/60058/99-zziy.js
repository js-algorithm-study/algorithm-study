function isCorrectBracket(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") stack.push(str[i]);
    else {
      if (stack.length === 0) return false;
      else stack.pop();
    }
  }
  return stack.length === 0;
}

function solution(p) {
  const bracket = p;

  if (isCorrectBracket(bracket)) return bracket;
  else {
    let u = "";
    let v = "";
    let left = 0;
    let right = 0;

    for (let i = 0; i < bracket.length; i++) {
      if (bracket[i] === "(") left++;
      if (bracket[i] === ")") right++;
      u += bracket[i];
      if (left === right) {
        v = bracket.slice(u.length);
        break;
      }
    }

    if (isCorrectBracket(u)) {
      return u + solution(v);
    } else {
      let tmp = "(" + solution(v) + ")";
      u = u.slice(1, u.length - 1);
      for (let i = 0; i < u.length; i++) {
        if (u[i] === "(") tmp += ")";
        else tmp += "(";
      }
      return tmp;
    }
  }
}

console.log(solution(")("));
