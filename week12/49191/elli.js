/* 
- 1번부터 n번까지 번호
- A 선수가 B 선수보다 실력이 좋다면 A 선수는 B 선수를 항상 이김
- 정확하게 순위를 매길 수 있는 선수의 수를 return 
- [A, B]는 A 선수가 B 선수를 이겼다  A > B

위상정렬!! 생각나네. 

위상정렬을 해서 처음으로 분기가 되는 곳을 찾기..?? (분기 === 순서를 정할 수 없음.)

이긴쪽(진입) <= 진쪽(진출)

---

a <- b, b <- c 이면 a <- c
하지만, a -> b, b <- c는 a,c 모름

*/

function solution(n, results) {
  var answer = 0;

  let dp = new Array(n + 1).fill(0).map((e) => new Array(n + 1).fill(0));

  for (let i = 0; i < results.length; i++) {
    let [win, lose] = results[i];

    dp[lose][win] = 1;
  }

  // console.log(dp);

  // dp[lose][win] = 1;

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp.length; j++) {
      for (let x = 1; x < dp.length; x++) {
        if (dp[i][j] === 1) continue; // 이미 결과가 있으니깐

        // i > x > j 인 경우에만 i > j가 보장
        dp[i][j] = dp[i][x] + dp[x][j] === 2 ? 1 : 0;
      }
    }
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp.length; j++) {
      for (let x = 1; x < dp.length; x++) {
        if (dp[i][j] === 1) continue; // 이미 결과가 있으니깐

        // i > x > j 인 경우에만 i > j가 보장
        dp[i][j] = dp[i][x] + dp[x][j] === 2 ? 1 : 0;
      }
    }
  }

  /* 

		  W  1  2  3  4  5 
	L [ 0, 0, 0, 0, 0, 0 ],
  1 [ 0, 0, 0, 0, 0, 0 ],
  2 [ 0, 1, 0, 1, 1, 0 ],
  3 [ 0, 0, 0, 0, 1, 0 ],
  4 [ 0, 0, 0, 0, 0, 0 ],
  5 [ 0, 1, 1, 1, 1, 0 ]
	
	*/
  // console.log(dp);

  let ans = [];
  for (let i = 0; i < dp.length; i++) {
    ans[i] = dp[i].filter((ele) => ele === 1).length;
  }

  ans.sort((a, b) => b - a); // 내림차순
  ans.pop(); // 0번 제거

  // console.log(ans);

  let max = Math.max(...ans);

  while (true) {
    let curr = ans[0];

    // 1개만
    if (curr === max && ans.filter((ele) => ele === curr).length === 1) {
      answer++;
      max--;
      ans.shift();
    } else {
      break;
    }
  }

  console.log(answer, "answer");

  return answer;
}

// solution(5, [
//   [4, 3],
//   [4, 2],
//   [3, 2],
//   [1, 2],
//   [2, 5],
// ]); //2

// solution(4, [
//   [1, 2],
//   [2, 3],
//   [1, 4],
// ]); // 1

// solution(6, [
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [4, 5],
//   [5, 6],
// ]); // 6

solution(5, [
  [1, 4],
  [4, 2],
  [2, 5],
  [5, 3],
]); // 5
