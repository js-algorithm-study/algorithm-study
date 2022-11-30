/* 
- 유일성(uniqueness)
- 최소성(minimality) : 유일성을 가진 키를 구성하는 속성(Attribute) 중 하나라도 제외하는 경우 유일성이 깨지는 것

return 후보 키의 최대 개수

조합? 유일성 확인

그 후에 최소성 확인. 어차피 키의 개수가 작은 것 부터 정렬되어 있을 테니
shift해서 나온 것부터 하나씩 다른 키 조합이 해당 키를 완전히 포함하고 있는지 체크해서 지워주면 됨.
예를 들어) [0,1]의 키가 shift되었으면 [1,2], [0,2], [0,1,2] 중 [0,1,2]를 제거해주면 됨. 

*/

function solution(relation) {
  let answer = 0;

  let columnsLength = relation[0].length;

  let columns = new Array(columnsLength).fill(0).map((_, idx) => idx);

  let combinations = [];
  for (let i = 1; i <= columns.length; i++) {
    combinations.push(...getCombinations(columns, i));
  }

  console.log(combinations);

  // 희소성

  let uniqueness = [];

  for (let i = 0; i < combinations.length; i++) {
    let comb = combinations[i];
    let arr = [];
    for (let j = 0; j < relation.length; j++) {
      let word = "";
      for (let l = 0; l < comb.length; l++) {
        word += relation[j][comb[l]];
      }
      arr.push(word);
    }

    if (new Set(arr).size === relation.length) {
      uniqueness.push(comb);
    }
  }

  console.log(uniqueness);

  // 최소성
  while (uniqueness.length > 0) {
    let curr = uniqueness.shift();
    answer++;
    console.log(curr);

    uniqueness = uniqueness.filter((e) => {
      let flag = true;

      // [0, 2]이면 둘다 포함해야.
      let len = 0;
      curr.forEach((i) => {
        if (e.includes(i)) len++;
      });
      if (len === curr.length) flag = false;

      return flag;
    });
  }

  console.log("answer", answer);

  return answer;
}

const getCombinations = function (arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((el) => [el]);
  // n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    // 해당하는 fixed를 제외한 나머지 뒤
    const combinations = getCombinations(rest, selectNumber - 1);
    // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map((el) => [fixed, ...el]);
    //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached);
    // 배열 spread syntax 로 모두다 push
  });

  return results; // 결과 담긴 results return
};

// solution([
//   ["100", "ryan", "music", "2"],
//   ["200", "apeach", "math", "2"],
//   ["300", "tube", "computer", "3"],
//   ["400", "con", "computer", "4"],
//   ["500", "muzi", "music", "3"],
//   ["600", "apeach", "music", "2"],
// ]); // 2

solution([
  ["a", "1", "aaa", "c", "ng"],
  ["a", "1", "bbb", "e", "g"],
  ["c", "1", "aaa", "d", "ng"],
  ["d", "2", "bbb", "d", "ng"],
]); // 5
