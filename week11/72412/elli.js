/*
- 개발언어 : cpp, java, python 중 하나를 선택
- 지원 직군 : backend와 frontend 중 하나
- 경력 : junior와 senior 중 하나를 선택
- 소울푸드 : chicken과 pizza 중 하나를 선택

- [조건]을 만족하는 사람 중 코딩테스트 점수를 X점 이상 받은 사람은 모두 몇 명인가?

query, info, 배열 하나 더 해서 3중 for문 나오는 순간 효율성 실패. query, info 이중 for문도 간당간당함

filtering으로 이중 for문을 만들었는데 그래도 효율성 실패가 나오네..
*/

function solution(info, query) {
  let answer = [];

  let informations = [];

  // 정리
  for (let i = 0; i < info.length; i++) {
    const information = info[i].split(" ");
    informations.push([...information]);
  }

  const queries = [];

  for (let i = 0; i < query.length; i++) {
    const q = query[i].split(" ");
    const language = q[0];
    const job = q[2];
    const career = q[4];
    const food = q[6];
    const score = q[7];
    queries.push([language, job, career, food, score]);
  }

  informations.sort((a, b) => a[4] - b[4]);

  for (let q = 0; q < queries.length; q++) {
    const [language, job, career, food, score] = queries[q];
    // console.log(queries[q]);

    let arr = informations;

    // query를 미리 좀 걷어내는 것이 핵심인가..?
    arr = arr.filter((ele) => Number(ele[4]) >= Number(score));

    if (language !== "-") {
      arr = arr.filter((ele) => filtering(ele[0], language));
    }

    if (job !== "-") {
      arr = arr.filter((ele) => filtering(ele[1], job));
    }

    if (career !== "-") {
      arr = arr.filter((ele) => filtering(ele[2], career));
    }

    if (food !== "-") {
      arr = arr.filter((ele) => filtering(ele[3], food));
    }

    answer.push(arr.length);
    // console.log(len);
  }
  console.log(answer);

  return answer;
}

function filtering(info, query) {
  // console.log(info, query);
  if (query === "-") {
    return true;
  }
  return query === info;
}

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
); // [1,1,1,1,2,4]
