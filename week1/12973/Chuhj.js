function solution(s) {
  const stack = [];
  for (const char of s) {
    // 스택의 top 값과 스택에 넣으려는 값이 같다면 스택에서 pop
    if (stack.length > 0 && stack[stack.length - 1] === char) stack.pop();
    else stack.push(char);
  }

  return stack.length === 0 ? 1 : 0;
}
