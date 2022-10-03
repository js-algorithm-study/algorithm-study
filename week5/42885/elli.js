/* 
구명 보트로 탈출. 2명씩. 무게 제한
구명 보트 최대한 적게 사용 => 그리디. 그때 그때 최선을 다해서. 일직선상.
둘이 합쳐서 100이 안되는 애들부터?
*/

function solution(people, limit) {
  let answer = 0;

  people.sort((a, b) => b - a); // 가장 작은 수부터 제거하니깐 앞의 큰수에서 짝을 찾을 가능성 높다

  let index = 0;
  while (people.length > 0) {
    // 이런 복잡한 작업 필요가 없음!. 내림차순 sort했으니깐 맨 마지막 친구가 같이 못타면 다 못탐

    // let sum = firstPerson;
    // let target = -1;
    // for (let i = 0; i < people.length; i++) {
    //   let secondPerson = people[i];
    //   let newSum = firstPerson + secondPerson;
    //   if (newSum > sum && newSum <= limit) {
    //     sum = newSum;
    //     target = i;
    //   }
    //   if (newSum === limit) {
    //     target = i;
    //     break;
    //   }
    // }

    if (index >= people.length) {
      break;
    }

    let firstPerson = people[index];
    let secondPerson = people[people.length - 1];

    // 같이 탈 사람 없음
    if (firstPerson + secondPerson > limit) {
      index++;
      answer++;
    }
    // 같이 탈 사람 추가 제거
    else {
      index++;
      answer++;
      people.pop();
    }
  }

  console.log("answer", answer);
  return answer;
}

solution([70, 50, 80, 50], 100);
solution([70, 80, 50], 100);
