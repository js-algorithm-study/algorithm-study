/* 
주어진 모든 문제를 풀 수 있는 알고력과 코딩력.

2차원 배열. x = 알고력 / y = 코딩력. arr[x][y] = cost 합계

for문을 돌리면서 arr[x][y]를 채움. for문 내부 끝에서 problems 풀 수 있는지 체크해서 값 덮어씌우기.

낮으면 낮을 수록 OK
*/

function solution(alp, cop, problems) {
  let answer = 0;

  // sort 하면 늦음.
  // const alpMax = problems.sort((a, b) => b[0] - a[0])[0][0];
  // const copMax = problems.sort((a, b) => b[1] - a[1])[0][1];

  let [alpMax, copMax] = [alp, cop];

  // problems 중에서 알고력과 코딩력의 max 값을 넘게되면 종료
  problems.forEach((v) => {
    alpMax = Math.max(alpMax, v[0]);
    copMax = Math.max(copMax, v[1]);
  });

  // (alp max) x (cop max) ex) 10~20 x 10~20
  console.log(`alp max = ${alpMax} / cop max = ${copMax}`);
  // 최대 값 150
  const arr = Array(alpMax + 1)
    .fill(Infinity)
    .map((x) => Array(copMax + 1).fill(Infinity));

  // min 값 비교해야되서 초기화
  arr[alp][cop] = 0;

  for (let i = alp; i <= alpMax; i++) {
    for (let j = cop; j <= copMax; j++) {
      // 기본으로 alp, cop를 1씩 올려주는. max에 도달할때까지만.
      if (i < alpMax) arr[i + 1][j] = Math.min(arr[i][j] + 1, arr[i + 1][j]);
      if (j < copMax) arr[i][j + 1] = Math.min(arr[i][j] + 1, arr[i][j + 1]);
      if (i === alpMax && j === copMax) break;

      for (let pro of problems) {
        const [alp_req, cop_req, alp_rwd, cop_rwd, cost] = pro;
        // 조건 만족하는 문제만
        if (i >= alp_req && j >= cop_req) {
          // max가 최대값
          const targetI = i + alp_rwd > alpMax ? alpMax : i + alp_rwd;
          const targetJ = j + cop_rwd > copMax ? copMax : j + cop_rwd;
          arr[targetI][targetJ] = Math.min(
            arr[targetI][targetJ],
            arr[i][j] + cost
          );
        }
      }
      // print(arr);
    }
  }

  console.log(arr[alpMax][copMax]);
  answer = arr[alpMax][copMax];

  return answer;
}

function print(arr) {
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    const str = row.join("");
    console.log(str);
  }
  console.log("----------");
}

// console.log(
//   solution(10, 10, [
//     [10, 15, 2, 1, 2],
//     [20, 20, 3, 3, 4],
//   ])
// ); // 15

console.log(
  solution(0, 0, [
    [0, 0, 2, 1, 2],
    [4, 5, 3, 1, 2],
    [4, 11, 4, 0, 2],
    [10, 4, 0, 4, 2],
  ])
); // 13
