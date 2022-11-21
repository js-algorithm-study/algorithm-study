function solution(n, stations, w) {
  let answer = 0;

  // 구멍들의 구간을 모두 구해서 각각에 들어갈 수 있는 최소 기지국의 수를 모두 더함
  // 구멍마다 최소 기지국의 수: Math.ceil(구멍 길이 / w * 2 + 1)

  let index = 1;

  for (const station of stations) {
    const holeLength = station - w - index;
    index = station + w + 1;
    answer += Math.ceil(holeLength / (w * 2 + 1));
  }

  const lastHoleLength = n - index + 1;

  if (lastHoleLength > 0) {
    answer += Math.ceil(lastHoleLength / (w * 2 + 1));
  }

  return answer;
}

console.log(solution(11, [4, 11], 1));
