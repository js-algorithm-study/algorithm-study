// /*

// */

// function solution(alp, cop, problems) {
//   let [maxAlp, maxCop] = [alp, cop];

//   // problems 중에서 알고력과 코딩력의 max 값을 넘게되면 종료
//   problems.forEach((v) => {
//     maxAlp = Math.max(maxAlp, v[0]);
//     maxCop = Math.max(maxCop, v[1]);
//   });

//   // 2차원 배열 [alp][cod] = 지금까지의 cost
//   const dp = Array.from({ length: maxAlp + 1 }, () =>
//     Array.from({ length: maxCop + 1 }, () => Infinity)
//   );
//   dp[alp][cop] = 0;

//   for (let i = alp; i <= maxAlp; i++) {
//     for (let j = cop; j <= maxCop; j++) {
//       if (i < maxAlp) dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
//       if (j < maxCop) dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
//       if (i === maxAlp && j === maxCop) break;

//       //console.log("if", dp);
//       // 위의 한칸씩 이동한던 것에 비하면, 지름길(일 수도) +1씩해서 온 것보다 더 낮겠지.
//       for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
//         if (i < alp_req || j < cop_req) continue; // 조건 안 되면 지나쳐감.
//         let currAlp = i + alp_rwd > maxAlp ? maxAlp : i + alp_rwd;
//         let currCop = j + cop_rwd > maxCop ? maxCop : j + cop_rwd;
//         dp[currAlp][currCop] = Math.min(dp[currAlp][currCop], dp[i][j] + cost);
//         //console.log("for", dp);
//       }
//     }
//   }

//   console.log(dp[maxAlp][maxCop]);
//   return dp[maxAlp][maxCop];
// }

// // solution(10, 10, [
// //   [10, 15, 2, 1, 2],
// //   [20, 20, 3, 3, 4],
// // ]);
// // solution(0, 0, [
// //   [0, 0, 2, 1, 2],
// //   [4, 5, 3, 1, 2],
// //   [4, 11, 4, 0, 2],
// //   [10, 4, 0, 4, 2],
// // ]);

// solution(0, 0, [
//   [0, 2, 2, 4, 2],
//   [0, 10, 2, 2, 2],
// ]);
