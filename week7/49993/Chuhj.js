function solution(skill, skill_trees) {
  // skill에 있는 알파벳의 순서만 지키면 됨
  // "CBADF"
  // 순회하며 skill("CBD")에 있는지 확인
  // 있으면 그 인덱스 이전의 스킬들을 배웠는지 확인

  let answer = 0;

  for (const tree of skill_trees) {
    let skillStatus = skill.split('').reduce((acc, cur) => {
      if (acc[cur] === undefined) acc[cur] = false;
      return acc;
    }, {});

    let isAvailable = true;
    for (const userSkill of tree) {
      const skillIndex = skill.indexOf(userSkill);

      if (skillIndex === -1) continue;

      for (let i = 0; i < skillIndex; i++) {
        if (!skillStatus[skill[i]]) {
          // 안되는 스킬트리
          isAvailable = false;
          break;
        }
      }

      if (!isAvailable) break;

      skillStatus[userSkill] = true;
    }

    if (isAvailable) {
      answer += 1;
    }
  }

  return answer;
}

console.log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));
