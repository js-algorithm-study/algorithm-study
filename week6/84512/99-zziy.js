// https://jinn2u.tistory.com/9 - 못 풀어서 참고

function solution(word) {
  const obj = {
    A: 0,
    E: 1,
    I: 2,
    O: 3,
    U: 4,
  };
  const plus = [781, 156, 31, 6, 1];
  return word
    .split("")
    .reduce((acc, cur, idx) => acc + obj[cur] * plus[idx] + 1, 0);
}

console.log(solution("A"));
