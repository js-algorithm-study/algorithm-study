function solution(msg) {
  var answer = [];
  const map = new Map();

  // A~Z까지 map에 넣기
  for (let i = 65; i < 91; i++) {
    map.set(String.fromCharCode([i]), i - 64);
  }

  for (let i = 0; i < msg.length; i++) {
    let findStr = msg[i];

    while (map.has(findStr) && i < msg.length) {
      i++;
      if (msg[i] !== undefined) findStr += msg[i];
    }

    i--;
    if (!map.has(findStr)) map.set(findStr, map.size + 1);

    if (i + 1 !== msg.length) findStr = findStr.slice(0, -1);
    answer.push(map.get(findStr));
  }

  return answer;
}

console.log(solution("TOBEORNOTTOBEORTOBEORNOT"));
