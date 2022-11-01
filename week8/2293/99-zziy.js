let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [, k] = input[0].split(" ");
const coins = input.slice(1).map((v) => +v);

const solution = (k, coins) => {
  const dy = Array(k + 1).fill(0);
  dy[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= k; j++) {
      dy[j] += dy[j - coins[i]];
    }
  }
  return dy[k];
};

console.log(solution(Number(k), coins));
