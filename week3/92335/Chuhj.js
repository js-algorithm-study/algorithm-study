function solution(n, k) {
  const kRadix = n.toString(k);

  let answer = 0;

  let string = '';
  for (const char of kRadix) {
    if (char !== '0') {
      string += char;
    } else {
      // string 검사
      if (isPrime(Number(string))) answer += 1;
      string = '';
    }
  }

  if (isPrime(Number(string))) answer += 1;

  return answer;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(solution(437674, 3));
console.log(solution(110011, 10));
