function solution(msg) {
  let answer = [];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let dict = alphabet.split('').reduce((acc, cur, index) => {
    acc[index + 1] = cur;
    return acc;
  }, {});

  let w = 0;
  let c = 1;

  while (c < msg.length) {
    let current = msg[w];

    while (findIndex(dict, current + msg[c]) !== -1) {
      // 사전에 등록되어 있지 않은 문자가 되기 전까지 현재입력을 늘려줌
      current += msg[c];
      c += 1;
    }

    answer.push(findIndex(dict, current));

    const dictLength = Object.keys(dict).length;
    dict[dictLength + 1] = current + msg[c]; // dict의 끝에 추가

    w = c;
    c = w + 1;
  }

  if (findIndex(dict, msg[w]) !== -1) answer.push(findIndex(dict, msg[w]));

  return answer;
}

function findIndex(dict, string) {
  for ([key, value] of Object.entries(dict)) {
    if (string === value) return Number(key);
  }
  return -1;
}
