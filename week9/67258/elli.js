/*
특정 범위의 물건을 쓸어 담는 갑부 어피치...

진열된 모든 종류의 보석을 적어도 1개 이상 포함하는 "가장 짧은 구간"을 찾아서 구매
만약 짧은 구간이 여러개면 가장 앞의 것으로

구간을 뽑아낸다...

start = 0, end = 0

end를 하나씩 올린다. [start, end] 사이의 보석 개수가 전체 보석 개수와 같으면 stop
start를 하나씩 올린다. [start, end]사이의 보석 개수가 전체 보석 개수보다 떨어지기 직전에 stop

이렇게 찾았으며는 후보군에 insert!!

let < right 때까지 계속 반복


*/

function solution(gems) {
  let answer = [];

  const types = getTypes(gems);

  let candidate = [];

  let start = 0;
  let end = start + types.length - 1;

  while (start <= end && end < gems.length) {
    // console.log("start :", start, "end : ", end);
    const currentGems = gems.slice(start, end + 1);
    // console.log(currentGems, "current");

    if (getTypes(currentGems).length === types.length) {
      candidate.push([start, end, end - start]);
      start++;
      continue;
    }

    if (getTypes(currentGems).length < types.length) {
      end++;
    } else {
      start++;
    }
  }

  candidate = candidate.sort((a, b) => a[2] - b[2]);

  // console.log("candidate", candidate[0]);

  return [candidate[0][0] + 1, candidate[0][1] + 1];
}

function getTypes(gems) {
  return Array.from(new Set(gems));
}

solution(["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]); // [3,7]
// solution(["AA", "AB", "AC", "AA", "AC"]); // [1,3]
// solution(["XYZ", "XYZ", "XYZ"]); // [1,1]
// solution(["ZZZ", "YYY", "NNNN", "YYY", "BBB"]); // [1,5]

// solution(["XYZ"]); // [1,1]

// solution(["A", "A", "A", "B", "B"]); // [3,4]
// solution(["A", "B", "B", "B", "B", "B", "B", "C", "B", "A"]); // [8,10]

// solution(["A", "B", "C", "B", "F", "D", "A", "F", "B", "D", "B"]); // [3,7]
