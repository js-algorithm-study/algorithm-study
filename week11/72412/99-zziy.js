function solution(infos, queries) {
  let answer = Array(queries.length).fill(0);
  let arr = [];

  queries = queries.map((query) => {
    if (query.includes("and")) {
      return (query = query.replace(/ and/g, ""));
    }
  });

  const queue = [queries[0]];

  while (queue.length || queries.length) {
    const query = queue.shift();
    const [language, position, career, food, score] = query.split(" ");
    if (!query.includes("-")) {
      arr.push(query);
    }
    if (language === "-") {
      queue.push(query.replace("-", "cpp"));
      queue.push(query.replace("-", "java"));
      queue.push(query.replace("-", "python"));
    }
    if (position === "-") {
      queue.push(query.replace("-", "backend"));
      queue.push(query.replace("-", "frontend"));
    }
    if (career === "-") {
      queue.push(query.replace("-", "junior"));
      queue.push(query.replace("-", "senior"));
    }
    if (food === "-") {
      queue.push(query.replace("-", "chicken"));
      queue.push(query.replace("-", "pizza"));
    }
    if (queue.length === 0 && queries.length) {
      queue.push(queries.shift());
    }
  }
  console.log(arr);

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
