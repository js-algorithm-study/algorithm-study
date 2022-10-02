function solution(people, limit) {
  let answer = 0;
  people.sort((a, b) => a - b);

  let lp = 0;
  let rp = people.length - 1;

  while (lp <= rp) {
    if (people[lp] + people[rp] <= limit) {
      // 보트에 태우기
      lp += 1;
      rp -= 1;
    } else {
      // 무게 줄이기
      // 제일 무거운 사람은 혼자 타게됨
      rp -= 1;
    }
    answer += 1;
  }

  return answer;
}

console.log(solution([70, 50, 80, 50], 100));
console.log(solution([1, 2, 3, 4, 6, 6], 7));
console.log(solution([70, 80, 50], 100));
