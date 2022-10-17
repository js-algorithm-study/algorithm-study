/* 
가상의 닉네임으로 채팅방

채팅방을 오가는 사람들 관리창.

중복닉네임 허용

모든 기록이 처리된 후, 방 개설자가 보게 되는 메시지를 문자열 배열로 return

enter, leave, chage / uid / nickname
*/

function solution(record) {
  let answer = [];

  // answer에 넣어주기
  for (let i = 0; i < record.length; i++) {
    const [action, uid, nickname] = record[i].split(" ");
    if (action === "Enter") {
      answer.push(`${uid}님이 들어왔습니다.`);
    }
    if (action === "Leave") {
      answer.push(`${uid}님이 나갔습니다.`);
    }
  }

  // users nickname 변경 기록
  const users = {};

  for (let i = 0; i < record.length; i++) {
    const [action, uid, nickname] = record[i].split(" ");
    if (action === "Enter") {
      users[uid] = nickname;
    }
    if (action === "Change") {
      users[uid] = nickname;
    }
  }

  answer = answer.map((sentence) => {
    const uid = sentence.split("님")[0];
    const sen = sentence.replace(`${uid}`, users[uid]);
    return sen;
  });

  // console.log(users);

  console.log(answer);

  return answer;
}

solution([
  "Enter uid1234 Muzi",
  "Enter uid4567 Prodo",
  "Leave uid1234",
  "Enter uid1234 Prodo",
  "Change uid4567 Ryan",
]); // ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]
