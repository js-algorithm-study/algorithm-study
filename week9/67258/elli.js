/*
특정 범위의 물건을 쓸어 담는 갑부 어피치...

진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 "가장 짧은 구간"을 찾아서 구매
만약 짧은 구간이 여러개면 가장 앞의 것으로

구간을 뽑아낸다...

start = 0, end = 0

[start, end] 사이의 보석 개수가 전체 보석 개수와 같으면 start를 하나씩 올린다. 
start, end]사이의 보석 개수가 전체 보석 개수보다 작으면 end를 하나씩 올린다.

이렇게 찾았으며는 후보군에 insert!!

let < right 때까지 계속 반복

---

배열을 사용해서 slice쓰지 말고

map을 사용하자.

map[gem] = 반복 갯수 (0되면 제거)

map은 object랑 비슷은	하지만

map.size가 가능. 순서도 보장


*/

function solution(gems) {
  let answer = [];

  const typeSize = new Set(gems).size;

  let candidate = [];

  let start = 0;
  let end = start + typeSize - 1;

  let list = new Map();

  for (let i = 0; i <= end; i++) {
    let gem = gems[i];
    gemAdd(gem, list);
  }

  while (start <= end && end < gems.length) {
    // console.log(start, end, list);
    if (list.size === typeSize) {
      candidate.push([start, end, end - start]);
      gemDel(gems[start], list);
      start++;
      continue;
    }

    if (list.size < typeSize) {
      end++;
      gemAdd(gems[end], list);
    } else {
      gemDel(gems[start], list);
      start++;
    }
  }

  candidate = candidate.sort((a, b) => a[2] - b[2]);

  console.log("candidate", candidate[0]);

  return [candidate[0][0] + 1, candidate[0][1] + 1];
}

function gemAdd(gem, list) {
  if (list.has(gem)) {
    list.set(gem, list.get(gem) + 1);
  } else {
    list.set(gem, 1);
  }
}

function gemDel(gem, list) {
  if (list.get(gem) === 1) {
    list.delete(gem);
  } else {
    list.set(gem, list.get(gem) - 1);
  }
}

solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]); // [3,7]
solution(["AA", "AB", "AC", "AA", "AC"]); // [1,3]
solution(["XYZ", "XYZ", "XYZ"]); // [1,1]
solution(["ZZZ", "YYY", "NNNN", "YYY", "BBB"]); // [1,5]

solution(["XYZ"]); // [1,1]

solution(["A", "A", "A", "B", "B"]); // [3,4]
solution(["A", "B", "B", "B", "B", "B", "B", "C", "B", "A"]); // [8,10]

solution(["A", "B", "C", "B", "F", "D", "A", "F", "B", "D", "B"]); // [3,7]
