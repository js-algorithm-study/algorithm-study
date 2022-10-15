function solution(records) {
  let answer = [];
  const userMap = new Map();
  records.forEach((record) => {
    const [, id, name] = record.split(" ");

    // 이름을 변경하는 경우는 Enter와 Change인데,
    // Leave는 name이 없기 때문에 name이 있는 (Enter,Change) 에서만 변경을 해주기 위함
    if (name) {
      userMap.set(id, name);
    }
  });

  records.forEach((record) => {
    const [action, id] = record.split(" ");

    const name = userMap.get(id);
    if (action === "Enter") {
      answer.push(`${name}님이 들어왔습니다.`);
    }
    if (action === "Leave") {
      answer.push(`${name}님이 나갔습니다.`);
    }
  });

  return answer;
}

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ])
);
