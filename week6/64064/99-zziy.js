const conbination = (list) => {
  const answerList = [];
  const check = [];
  function dfs(k) {
    if (k === list.length) {
      const tmp = [...check];
      const answer = tmp.sort().join("");
      if (!answerList.includes(answer)) {
        answerList.push(answer);
      }
      return;
    }
    for (let j = 0; j < list[k].length; j++) {
      if (!check.includes(list[k][j])) {
        check.push(list[k][j]);
        dfs(k + 1);
        check.pop();
      }
    }
  }
  dfs(0);
  return answerList.length;
};

const isBannedId = (userId, bannedId) => {
  if (userId.length !== bannedId.length) return false;
  for (let i = 0; i < userId.length; i++) {
    if (bannedId[i] === "*") continue;
    if (userId[i] === bannedId[i]) continue;
    else return false;
  }
  return true;
};

const solution = (userIdList, bannedIdList) => {
  const count = Array.from({ length: bannedIdList.length }).fill(0);
  const bannedMap = [];

  /* 
  가능한 경우를 bannedMap에 넣어둠
  [[ 'frodo', 'fradi' ],
  [ 'frodo', 'crodo' ],
  [ 'abc123', 'frodoc' ],
  [ 'abc123', 'frodoc' ]] 
  그런데 여기서 끝내버리면 frodo, frodo, abc123, frodoc 라던지 frodo,crodo, abc123, abc123 이런 ban 당한 user id가 중복되는 경우가 생길수 있음
  combintaion 함수를 통해 중복을 check 하며 경우의 수를 만들어준다!
  */

  bannedIdList.forEach((bannedId, bannedIdIndex) => {
    const tmpList = [];
    userIdList.forEach((userId) => {
      if (isBannedId(userId, bannedId)) {
        count[bannedIdIndex] = count[bannedIdIndex] + 1;
        tmpList.push(userId);
      }
    });
    bannedMap[bannedIdIndex] = tmpList;
  });

  return conbination(bannedMap);
};

console.log(
  solution(
    ["frodo", "fradi", "crodo", "abc123", "frodoc"],
    ["fr*d*", "*rodo", "******", "******"]
  )
);
