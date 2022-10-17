function solution(record) {
  record = record.map((r) => r.split(' '));
  let answer = [];
  let users = {};

  for (let [act, uid, name] of record) {
    if (act === 'Enter' || act === 'Change') {
      users[uid] = name;
    }
  }

  for (let [act, uid] of record) {
    if (act === 'Enter') {
      answer.push(`${users[uid]}님이 들어왔습니다.`);
    } else if (act === 'Leave') {
      answer.push(`${users[uid]}님이 나갔습니다.`);
    }
  }

  return answer;
}

console.log(solution(['Enter uid1234 Muzi', 'Enter uid4567 Prodo', 'Leave uid1234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan']));
