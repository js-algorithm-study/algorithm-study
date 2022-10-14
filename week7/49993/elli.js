/* 
선행 스킬.

선행이면 약간 단방향 그래프가 생각이 나는 구먼?
위상정렬?

아니면, CBD가 아닌 글자들을 모두 지워볼까?

*/

function solution(skill, skill_trees) {
  let answer = 0;

  const deleted = skill_trees.map((word) => {
    let w = "";
    for (let i = 0; i < word.length; i++) {
      if (skill.indexOf(word[i]) !== -1) {
        w = w += word[i];
      }
    }
    return w;
  });

  console.log(deleted);

  // skill CBD 이면 가능한 스킬트리 : C, CB, CBD

  const possible = [];

  for (let j = 0; j <= skill.length; j++) {
    const word = skill.slice(0, j);
    possible.push(word);
  }

  console.log(possible);

  deleted.forEach((w) => {
    if (possible.includes(w)) answer++;
  });

  console.log(answer);

  return answer;
}

solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]); // 2

solution("CBD", ["BACDE", "CBADF", "AECB", "BDA", "AQWER"]); // 3

solution("CBD", ["CED"]); // 0

solution("ABC", ["OPQ"]); // 1  => ""도 고려!
