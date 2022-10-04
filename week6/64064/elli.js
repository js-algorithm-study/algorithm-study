/*
응모자 : user_id
불량사용자 : banned_id 
return 가능한 제재아이디

약간 순열이 생각나는 군?
가능한 케이스의 개수 구하기?
*/

// function solution(user_id, banned_id) {
//   let answer = 1;

//   const users = user_id;
//   const banned = banned_id;

//   let check = {};
//   // users C ban 할 거임. (조합)

//   /*
// 		key : {
// 			users : [], // user 들
// 			ban : [], // ban 들
// 		}
// 		*/

//   // 일단 banned 입장에서 가능한 ban 대상자 구해보자.
//   banned.forEach((ban) => {
//     // 아예 없으면,
//     if (Object.keys(check).length === 0) {
//       check[ban] = {
//         users: [],
//         ban: [ban],
//       };
//     } else {
//       Object.keys(check).forEach((target) => {
//         if (isSame(target, ban)) {
//           check[target] = {
//             users: check[target].users,
//             ban: [...check[target].ban, ban], // users 두고 ban 한개만 추가
//           };
//         } else {
//           check[ban] = {
//             users: [],
//             ban: [ban],
//           };
//         }
//       });
//     }

//     console.log("after", check);

//     users.forEach((user) => {
//       // console.log(ban, user);
//       if (ban.length !== user.length) return false;

//       if (isSame(ban, user)) {
//         Object.keys(check).forEach((target) => {
//           if (isSame(target, ban)) {
//             check[target] = {
//               users: check[target].users.includes(user)
//                 ? [...check[target].users]
//                 : [...check[target].users, user], // users는 중복체크해서 넣기
//               ban: check[target].ban,
//             };
//           }
//         });
//       }
//     });
//   });

//   console.log(check, "last");

//   Object.entries(check).forEach((ele) => {
//     const [key, value] = ele;
//     const { users, ban } = value;
//     const n = users.length;
//     const r = ban.length;
//     const ans = (factorial(n) / factorial(r)) * factorial(n - r);
//     answer *= ans;
//   });

//   console.log(answer);

//   return answer;
// }

// function factorial(n) {
//   return n > 1 ? n * factorial(n - 1) : 1;
// }

// function isSame(word1, word2) {
//   if (word1.length !== word2.length) return false;

//   for (let i = 0; i < word1.length; i++) {
//     if (word1[i] === "*" || word2[i] === "*") {
//       word1 = word1.substring(0, i) + "*" + word1.substring(i + 1);
//       word2 = word2.substring(0, i) + "*" + word2.substring(i + 1);
//     }
//   }

//   if (word1 === word2) {
//     return true;
//   } else {
//     return false;
//   }
// }

// -------------------

function solution(users, bans) {
  // console.log(permutator(users));

  let result = [];

  // ban을 돌면서 각각의 ban에 가능한 user를 골라냄.
  bans.forEach((ban) => {
    let n = { ban: ban };
    let u = [];
    users.forEach((user) => {
      if (isSame(ban, user)) u.push(user);
    });
    n = { ban: n.ban, users: u };
    result.push(n);
  });

  // console.log(result);

  let banlist = result.map((ele) => ele.ban);

  // console.log(banlist);

  // banlist로 가능한 순열. 앞에서 고른 것에 따라 뒤에서 못 고를 수 도 있기 때문에 순서가 중요 => 순열
  const perm = permutator(banlist);

  // console.log("perm");
  // console.log(perm);

  let answers = [];

  const DFS = (index, list, answer) => {
    if (index >= list.length) {
      return answers.push(answer);
    }

    let now = list[index];

    // 해당 ban에 가능한 user list
    let userlist = result.filter((ele) => ele.ban === now)[0].users;

    for (let i = 0; i < userlist.length; i++) {
      const word = userlist[i];
      if (answer.includes(word)) continue; // 이미 포함하고 있으면 제외
      DFS(index + 1, list, [...answer, word]);
    }
  };

  for (let i = 0; i < perm.length; i++) {
    DFS(0, perm[i], []);
  }

  // 정렬해서 중복 제거
  answers = answers.map((ele) => ele.sort().join(""));

  const set = new Set(answers); // 중복 제거

  return set.size;
}

// solution(["frodo", "fradi", "crodo", "abc123", "frodoc"], ["fr*d*", "abc1**"]); //2
// solution(
//   ["frodo", "fradi", "crodo", "abc123", "frodoc"],
//   ["*rodo", "*rodo", "******"]
// ); //2
solution(
  ["frodo", "fradi", "crodo", "abc123", "frodoc"],
  ["fr*d*", "*rodo", "******", "******"]
); //3
// solution(["frido", "frodo"], ["fr*do", "fr**o"]);

// solution(["dao", "dizini", "bazzi"], ["d*o", "b*zz*"]); // 1

// solution(["prodo", "piodi", "proda", "pradak"], ["prod*", "p*od*", "pr*da*"]);

// 조합인줄 알았는데 순열이네..? 앞에서 먼저 선택하는 것에 따라서 뒤에 것이 영향을 받는다.!

function isSame(ban, user) {
  if (ban.length !== user.length) return false;

  for (let i = 0; i < ban.length; i++) {
    if (ban[i] === "*") continue;
    if (ban[i] !== user[i]) return false;
  }

  return true;
}

function permutator(inputArr) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}
