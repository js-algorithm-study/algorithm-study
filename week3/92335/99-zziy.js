function solution(n, k) {
  let answer = 0;
  const number = n.toString(k);
  number.split("0").forEach((num) => {
    if (num && isPrime(Number(num))) answer++;
  });
  return answer;
}

const isPrime = (num) => {
  if (num === 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

console.log(solution(110011, 10));
