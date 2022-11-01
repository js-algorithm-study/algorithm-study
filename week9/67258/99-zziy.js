function solution(gems) {
  let answer = [0, 10000000];
  const set = new Set(gems);
  const gemList = [...set];

  for (let i = 0; i < gems.length; i++) {
    const check = Array(gemList.length).fill(0);
    for (let j = i; j < gems.length; j++) {
      const index = gemList.indexOf(gems[j]);
      check[index] = 1;
      if (check.every((c) => c === 1)) {
        const [start, end] = answer;
        if (end - start > j - i) {
          answer = [i + 1, j + 1];
        }
        break;
      }
    }
  }

  return answer;
}

console.log(
  solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"])
);
console.log(solution(["AA", "AB", "AC", "AA", "AC"]));
console.log(solution(["XYZ", "XYZ", "XYZ"]));
console.log(solution(["ZZZ", "YYY", "NNNN", "YYY", "BBB"]));
