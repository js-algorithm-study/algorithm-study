function solution(s) {
  const stack = [];

  s.split("").forEach((char) => {
    if (stack.length === 0) {
      return stack.push(char);
    }
    if (stack[stack.length - 1] === char) {
      return stack.pop();
    }

    return stack.push(char);
  });

  return stack.length === 0 ? 1 : 0;
}

console.log(solution("baabaa"));
