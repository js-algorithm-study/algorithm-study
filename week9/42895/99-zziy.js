function solution(N, number) {
  let dp = Array.from(new Array(9), () => new Set());

  if (N === number) return 1;

  dp.forEach((element, index) => {
    if (index !== 0) element.add(Number(String(N).repeat(index)));
  });

  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j < i; j++) {
      for (let item1 of dp[j]) {
        for (let item2 of dp[i - j]) {
          dp[i].add(item1 + item2);
          dp[i].add(item1 - item2);
          dp[i].add(item1 * item2);
          dp[i].add(Math.floor(item1 / item2));
        }
      }
    }

    if (dp[i].has(number)) {
      return i;
    }
  }
  return -1;
}

console.log(solution(5, 12));
