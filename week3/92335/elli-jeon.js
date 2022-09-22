/* 
양의 정수 n => k 진수 변환


*/

function solution(decimal, k) {
  const number = changeToBinary(decimal, k);

  const splited = number.split("0");

  console.log(splited);

  let answer = 0;
  splited.forEach((str) => {
    if (str !== "" && checkPrime(Number(str))) {
      answer++;
    }
  });

  return answer;
}

/**
 *
 * @param {number} decimal 10진수 정수
 * @param {number} n n진수
 */
const changeToBinary = (decimal, n) => {
  return decimal.toString(n);
};

/**
 *
 * @param {number} num 10진수 정수
 * @returns boolean
 * 제곱근으로 소수 안 구하면 런타임 에러
 */
const checkPrime = (num) => {
  if (num === 0 || num === 1) return false;

  let flag = true;
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};

console.log(solution(437674, 3));
console.log(solution(110011, 10));
