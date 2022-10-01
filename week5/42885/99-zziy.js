// 무거운 애들부터 태우면 됨!
// 80,10,90,20 있으면 정렬해서
// [90,10], [80,20] 큰것부터 확인해야함 ! 큰것 부터 확인하지않으면 [90],[80,10],[20] 이렇게 될 수도 있음

function solution(people, limit) {
  let answer = 0;

  // 무거운 순으로 정렬
  people.sort((a, b) => b - a);

  while (people.length) {
    const weight = people.shift();
    let remain = limit - weight;
    let count = 1;

    for (let i = 0; i < people.length; i++) {
      if (remain >= people[i] && count < 2) {
        people.splice(i, 1);
        i--;
        count++;
      }
    }
    answer++;
  }

  return answer;
}

console.log(solution([30, 10, 20], 100));
