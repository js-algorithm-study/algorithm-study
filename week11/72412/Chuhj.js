function solution(info, query) {
  let answer = [];
  // 각 지원자 마다 가능한 쿼리문을 생성
  // 생성한 쿼리문을 key로 점수의 배열을 value로 하는 오브젝트 생성

  const queries = {};
  const all = '-';
  for (const app of info) {
    const [lang, job, career, food, score] = app.split(' ');
    for (const l of [lang, all]) {
      for (const j of [job, all]) {
        for (const c of [career, all]) {
          for (const f of [food, all]) {
            if (!queries[`${l} and ${j} and ${c} and ${f}`]) {
              queries[`${l} and ${j} and ${c} and ${f}`] = [];
            }
            queries[`${l} and ${j} and ${c} and ${f}`].push(Number(score));
          }
        }
      }
    }
  }

  for (const each of query) {
    let q = each.split(' and ');
    const score = Number(q[q.length - 1].split(' ')[1]);
    q[q.length - 1] = q[q.length - 1].split(' ')[0];
    q = q.join(' and ');

    answer.push(queries[q] ? queries[q].filter((v) => v >= score).length : 0);
  }

  return answer;
}

console.log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
);
