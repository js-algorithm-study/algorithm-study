function solution(skill, skillTrees) {
  let answer = 0;

  skillTrees.forEach((skillTree) => {
    let arr = [];

    // skillTree가 skill에 있는 내용이라면 arr에 indexOf를 넣어줌
    // 예를 들면 [ 1, 0, 2 ], [ 0, 1, 2 ], [ 0, 1 ], [ 1, 2 ] 이렇게 들어감
    for (let i = 0; i < skillTree.length; i++) {
      if (skill.includes(skillTree[i])) {
        const skillArr = skill.split("");
        arr.push(skillArr.indexOf(skillTree[i]));
      }
    }

    // arr의 길이만큼 돌려서 arr의 index와 arr[index]가 다 같으면 answer++
    // [ 0, 1, 2 ], [ 0, 1 ]가 가능
    // [ 1, 0, 2 ], [ 1, 2 ] 은 arr의 index와 arr[index]가 다름
    let isPossible = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i) {
        isPossible = false;
      }
    }

    if (isPossible) {
      answer++;
    }
  });

  return answer;
}

console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));
