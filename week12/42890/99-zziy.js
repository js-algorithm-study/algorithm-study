function check(relations, keys) {
  const filteredRelations = relations.filter((relation, index) => {
    return keys.includes(index + 1);
  });

  const tempArr = Array.from(Array(filteredRelations[0].length), () =>
    Array(filteredRelations.length).fill(0)
  );

  for (let i = 0; i < filteredRelations.length; i++) {
    for (let j = 0; j < filteredRelations[i].length; j++) {
      tempArr[j][i] = filteredRelations[i][j];
    }
  }

  const array = [];
  for (let i = 0; i < tempArr.length; i++) {
    const data = tempArr[i].join(",");
    array.push(data);
  }

  const set = new Set(array);
  return array.length === set.size;
}

function getCombinations(n, m) {
  let answer = [];
  let arr = [];
  function dfs(v, k) {
    if (v === m) answer.push([...arr]);
    else {
      for (let i = k; i <= n; i++) {
        arr[v] = i;
        dfs(v + 1, i + 1);
      }
    }
  }
  dfs(0, 1);
  return answer;
}

function solution(relations) {
  let answer = [];
  let keys = [];
  let filteredAnswer = [];

  const array = Array.from(Array(relations[0].length), () =>
    Array(relations.length).fill(0)
  );

  // 같은 열끼리 모으기
  for (let i = 0; i < relations.length; i++) {
    for (let j = 0; j < relations[i].length; j++) {
      array[j][i] = relations[i][j];
    }
  }

  // 후보키의 조합
  for (let i = 1; i <= array.length; i++) {
    let combination = getCombinations(array.length, i);
    for (let j = 0; j < combination.length; j++) {
      // 유일성 만족하는지 확인
      if (check(array, combination[j])) {
        answer.push(combination[j]);
      }
    }
  }

  // answer에는 유일성만 만족하는 답들이 있음 최소성만 만족하도록 filter 해야함
  for (let i = 0; i < answer.length; i++) {
    let flag = true;
    for (let j = 0; j < keys.length; j++) {
      if (keys[j].every((k) => answer[i].includes(k))) {
        flag = false;
      }
    }
    if (flag) {
      keys.push(answer[i]);
      filteredAnswer.push(answer[i]);
    }
    if (!keys.length) {
      keys.push(answer[i]);
      filteredAnswer.push(answer[i]);
    }
  }

  return filteredAnswer.length;
}

console.log(
  solution([
    ["a", "1", "aaa", "c", "ng"],
    ["a", "1", "bbb", "e", "g"],
    ["c", "1", "aaa", "d", "ng"],
    ["d", "2", "bbb", "d", "ng"],
  ])
);
