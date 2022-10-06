function solution(people, limit) {
  let answer = 0;
  let p1 = 0;
  let p2 = people.length - 1;

  // 무거운 순으로 정렬
  people.sort((a, b) => b - a);

  while (p1 <= p2) {
    if (people[p1] + people[p2] <= limit) {
      p1++;
      p2--;
    } else {
      p1++;
    }
    answer++;
  }

  return answer;
}

console.log(solution([70, 50, 80, 50], 100));
