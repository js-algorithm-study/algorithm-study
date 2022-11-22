/* 
- 5g 기지국은 4g 기지국보다 전달 범위가 좁아
- 전파의 도달 거리가 W일 땐, 기지국이 설치된 아파트를 기준으로 전파를 양쪽으로 W만큼 전달
- 5g 기지국을 최소로 설치하면서 모든 아파트에 전파를 전달하려
- 아파트 개수 : 최대 200,000,000, 현재 기지국 : 10,000 이하

이렇게 많은 수에서는 이분탐색이 생각나긴 하네.

비어있는 공간에 꽉꽉채워넣으면 최소로 사용할 수 있는 개수가 나올 것 같음.
8칸이면 5개씩이면 8 / 5 => 2 (올림)

효율성 다 망했는데, 아파트 개수 2억개라서 그런듯?

이분탐색으로 하자. station이 오름차순이니깐 for문을 돌면서 i - w, i + w가 left / right로

for문으로 (i-1) + w ~ (i) - w 가 전기가 안 들어오는 가구
특히, 맨처음과 맨 끝을 주의해야 함. 맨처음 1번 가구가 이미 불이 들어오는 가구일 수도 있으니깐 고려해서 해야함.
마지막 n번 가구도 for문 바깥에서 처리해주어야 함.

*/

function solution(n, stations, w) {
  var answer = 0;

  let list = [];
  // 1 ~ n
  for (let i = 0; i < stations.length; i++) {
    let left, right;

    if (i === 0) {
      left = 1;
      right = stations[i] - w <= 1 ? 1 : stations[i] - w;
      answer += calculate(right - left, w);

      // list.push(right - left);
    } else {
      left = stations[i - 1] + w;
      right = stations[i] - w;
      let ans = right - left <= 0 ? 0 : right - left - 1;
      answer += calculate(ans, w);
    }
  }

  // 맨마지막 ~ n
  let left =
    stations[stations.length - 1] + w >= n
      ? n
      : stations[stations.length - 1] + w;
  let right = n;
  answer += calculate(right - left, w);
  // list.push(right - left);

  // list.forEach((l) => {
  //   let width = 2 * w + 1;
  //   let ans = Math.ceil(l / width);
  //   answer += ans;
  // });

  // console.log(answer);

  return answer;
}

function calculate(target, w) {
  let width = 2 * w + 1;
  return Math.ceil(target / width);
}

solution(11, [4, 11], 1); //3
solution(16, [9], 2); // 3

/*
	let list = [];

  let count = 0;
  for (let j = 0; j < apartments.length; j++) {
    if (apartments[j] === -1) {
      count++;
    } else {
      if (count > 0) list.push(count);
      count = 0;
    }
  }

  // 마지막 부분 종료가 안되니깐.
  if (count > 0) list.push(count);


	*/
