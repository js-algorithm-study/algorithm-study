function solution(p) {
  return makeRightString(p);
}

function makeRightString(p) {
  if (p === '') return '';

  let [u, v] = separate(p);

  if (isRightString(u)) {
    u += makeRightString(v);
  } else {
    return '(' + makeRightString(v) + ')' + reverseU(u.slice(1, u.length - 1));
  }

  return u;
}

function separate(p) {
  // p를 u, v로 분리
  let u = '';
  let v = '';
  let left = 0;
  let right = 0;

  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') left += 1;
    if (p[i] === ')') right += 1;

    if (left === right) {
      // 균형잡힌 괄호 문자열
      u += p.slice(0, i + 1);
      v += p.slice(i + 1);
      return [u, v];
    }
  }
}

function reverseU(u) {
  // 문자열 u의 괄호 방향을 모두 바꿔줌
  return u
    .split('')
    .map((char) => (char === '(' ? ')' : '('))
    .join('');
}

function isRightString(string) {
  // 스택을 이용해 올바른 괄호 문자열인지 확인
  let stack = [];
  for (const c of string) {
    if (stack[stack.length - 1] === '(' && c === ')') stack.pop();
    else stack.push(c);
  }
  return stack.length === 0 ? true : false;
}
