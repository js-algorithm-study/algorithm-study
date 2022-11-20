/*
- 개발언어 : cpp, java, python 중 하나를 선택
- 지원 직군 : backend와 frontend 중 하나
- 경력 : junior와 senior 중 하나를 선택
- 소울푸드 : chicken과 pizza 중 하나를 선택

- [조건]을 만족하는 사람 중 코딩테스트 점수를 X점 이상 받은 사람은 모두 몇 명인가?

query, info, 배열 하나 더 해서 3중 for문 나오는 순간 효율성 실패. query, info 이중 for문도 간당간당함

filtering으로 이중 for문을 만들었는데 그래도 효율성 실패가 나오네..

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

	조합 + 이분탐색
*/

// function solution(info, query) {
//   let answer = [];

//   let informations = [];

//   // 정리
//   for (let i = 0; i < info.length; i++) {
//     const information = info[i].split(" ");
//     informations.push([...information]);
//   }

//   const queries = [];

//   for (let i = 0; i < query.length; i++) {
//     const q = query[i].split(" ");
//     const language = q[0];
//     const job = q[2];
//     const career = q[4];
//     const food = q[6];
//     const score = q[7];
//     queries.push([language, job, career, food, score]);
//   }

//   informations.sort((a, b) => a[4] - b[4]);

//   for (let q = 0; q < queries.length; q++) {
//     const [language, job, career, food, score] = queries[q];
//     // console.log(queries[q]);

//     let arr = informations;

//     // query를 미리 좀 걷어내는 것이 핵심인가..?
//     arr = arr.filter((ele) => Number(ele[4]) >= Number(score));

//     if (language !== "-") {
//       arr = arr.filter((ele) => filtering(ele[0], language));
//     }

//     if (job !== "-") {
//       arr = arr.filter((ele) => filtering(ele[1], job));
//     }

//     if (career !== "-") {
//       arr = arr.filter((ele) => filtering(ele[2], career));
//     }

//     if (food !== "-") {
//       arr = arr.filter((ele) => filtering(ele[3], food));
//     }

//     answer.push(arr.length);
//     // console.log(len);
//   }
//   console.log(answer);

//   return answer;
// }

// function filtering(info, query) {
//   // console.log(info, query);
//   if (query === "-") {
//     return true;
//   }
//   return query === info;
// }

// function solution(info, query) {
//   var answer = [];
//   let map = {};

//   function combination(infos, score, map, start) {
//     let key = infos.join(""); //키 값으로 쓸거 합쳐주기
//     let value = map[key]; //값 있는지 없는지 확인해주기

//     if (value) {
//       //값이 있으면 push
//       map[key].push(score);
//     } else {
//       //값이 없으면 프로퍼티 만들어줘야 됨
//       map[key] = [score];
//     }
//     //여기서는 - 를 이용해 조합 만들어주기
//     for (let i = start; i < infos.length; i++) {
//       let combiArr = [...infos]; //전개 연산자
//       combiArr[i] = "-";
//       combination(combiArr, score, map, i + 1);
//     }
//   }

//   function binarySearch(map, key, score) {
//     let scoreArr = map[key];

//     if (scoreArr) {
//       let start = 0;
//       let end = scoreArr.length;
//       while (start < end) {
//         let mid = Math.floor((start + end) / 2);

//         if (scoreArr[mid] >= score) {
//           //현재 가르키는 값보다 내가 찾는 값이
//           end = mid;
//         } else if (scoreArr[mid] < score) {
//           start = mid + 1;
//         }
//       }
//       return scoreArr.length - start;
//     } else return 0;
//   }

//   for (let i = 0; i < info.length; i++) {
//     let infos = info[i].split(" ");
//     let score = infos.pop();
//     combination(infos, score, map, 0);
//   }

//   for (let key in map) {
//     map[key].sort((o1, o2) => o1 - o2);
//   }

//   for (let i = 0; i < query.length; i++) {
//     let querys = query[i].replace(/ and /g, "").split(" ");
//     let score = Number(querys.pop());
//     answer.push(binarySearch(map, querys.join(""), score));
//   }

//   return answer;
// }

function solution(info, query) {
  // info를 쪼개준다.
  let map = {};
  let answer = [];

  for (let i = 0; i < info.length; i++) {
    let I = info[i].split(" ");
    let score = I.pop();
    combination(I, score, map, 0);
  }

  console.log(map);

  for (let key in map) {
    map[key].sort((o1, o2) => o1 - o2);
  }

  for (let i = 0; i < query.length; i++) {
    let querys = query[i].replace(/ and /g, "").split(" ");
    let score = Number(querys.pop());
    answer.push(binarySearch(map, querys.join(""), score));
  }

  console.log(answer);
}

function combination(info, score, map, start) {
  let key = info.join("");
  let value = map[key];

  if (value) {
    map[key].push(Number(score));
  } else {
    map[key] = [Number(score)];
  }

  for (let j = start; j < info.length; j++) {
    let combiArr = [...info];
    combiArr[j] = "-";
    combination(combiArr, score, map, j + 1);
  }
}

function binarySearch(map, key, score) {
  let scoreArr = map[key];

  if (scoreArr) {
    let start = 0;
    let end = scoreArr.length;
    while (start < end) {
      let mid = Math.floor((start + end) / 2);

      if (scoreArr[mid] >= score) {
        //현재 가르키는 값보다 내가 찾는 값이
        end = mid;
      } else if (scoreArr[mid] < score) {
        start = mid + 1;
      }
    }
    return scoreArr.length - start;
  } else return 0;
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
