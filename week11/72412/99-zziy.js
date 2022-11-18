function solution(infos, queries) {
  let answer = Array(queries.length).fill(0);
  let infoArr = [];
  let queryArr = [];

  infos.forEach((info) => {
    let str = "";
    let score = 0;
    info.split(" ").forEach((i, index) => {
      if (index === info.split(" ").length - 1) return (score = i);
      return (str += i[0]);
    });
    infoArr.push({ data: str, score: score });
  });

  queries.forEach((query) => {
    let str = "";
    let score = 0;
    query.split(" ").forEach((q, index) => {
      if (q === "and") return;
      if (q === "-") return (str += "*");
      if (index === query.split(" ").length - 1) return (score = q);
      return (str += q[0]);
    });
    queryArr.push({ data: str, score: score });
  });

  queryArr.forEach((query, qIdx) => {
    infoArr.forEach((info) => {
      let flag = true;
      for (let i = 0; i < 4; i++) {
        if (query.data[i] === "*") continue;
        if (query.data[i] !== info.data[i]) {
          flag = false;
          break;
        }
      }
      if (flag && Number(query.score) <= Number(info.score)) {
        answer[qIdx]++;
      }
    });
  });
  return answer;
}

console.log(
  solution(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 150",
    ]
  )
);
