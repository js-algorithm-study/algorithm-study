// @ts-nocheck
/*
현재 접근법 : 

- query 반복문 돌면서, 해당 query 조건에 해당하는 info를 걸러가지고 조건에 맞는 개수 구함.
- 문제는 이렇게하면, 매 query마다 조건에 해당하는 info를 filtering해야한다는 것.

만약, 조건에 해당하는 info들을 미리 골라낼 수 있다면??

	{
		javabackendjuniorpizza: [150] ,
		pythonfrontendseniorchicken: [150, 210] ,
		cppbackendseniorpizza: [260] ,
		javabackendjuniorchicken: [80] ,
		pythonbackendseniorchicken: [50] 
	}
 
	javabackendjuniorpizza 는 16 가지 경우의 수가 있다.

	java / -
	backend / -
	junior / -
	pizza / -

	미리 {}를 통해서 해당 키들의 배열을 얻을 수 있다. (키이기 때문에 O(1))


*/

function solution(info, query) {
  let answer = [];

  let informations = new Map();
  const queries = [];

  for (let i = 0; i < info.length; i++) {
    const information = info[i].split(" "); // arr

    const key = information.slice(0, 4).join("");
    const value = Number(information[4]);

    if (informations.has(key)) {
      informations.set(key, [...informations.get(key), value]);
    } else {
      informations.set(key, [value]);
    }
  }

  informations.forEach((ele) => ele.sort((a, b) => a - b));

  console.log(informations);

  for (let i = 0; i < query.length; i++) {
    const q = query[i].split(" ");
    const language = q[0];
    const job = q[2];
    const career = q[4];
    const food = q[6];
    const score = q[7];
    queries.push([language, job, career, food, score]);
  }

  // for (let i = 0; i < queries.length; i++) {
  //   const [language, job, career, food, score] = queries[i];

  //   // console.log(queries[i], "query");
  //   let scores = [];

  //   Object.values(informations).forEach((obj) => {
  //     const key = Object.keys(obj)[0];
  //     const value = Number(Object.values(obj)[0]);

  //     if (
  //       isIncluded(language, key) &&
  //       isIncluded(job, key) &&
  //       isIncluded(career, key) &&
  //       isIncluded(food, key)
  //     ) {
  //       scores.push(value);
  //     }
  //   });

  //   let count = findScore(scores, score);

  //   answer.push(count);
  // }

  // console.log(answer);

  return answer;
}

const getQuery = (query) => {
  let querylist = [];

  // console.log("q", query);
  const [language, job, career, food, score] = query;

  if (language === "-") {
    querylist.push(
      ["java", job, career, food],
      ["cpp", job, career, food],
      ["python", job, career, food]
    );
  } else if (job === "-") {
    querylist.push(
      [language, "backend", career, food],
      [language, "frontend", career, food]
    );
  } else if (career === "-") {
    querylist.push(
      [language, job, "junior", food],
      [language, job, "senior", food]
    );
  } else if (food === "-") {
    querylist.push(
      [language, job, career, "chicken"],
      [language, job, career, "pizza"]
    );
  } else {
    querylist.push([language, job, career, food]);
  }

  return querylist;
};

const findScore = (scores, targetScore) => {
  let left = 0;
  let right = scores.length;
  // console.log(scores);

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // console.log(mid);

    let midScore = scores[mid];

    if (targetScore > midScore) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return scores.length - left;
};

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
