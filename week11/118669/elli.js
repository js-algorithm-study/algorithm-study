/* 
- 각 지점은 1부터 n까지 번호가 붙어있으며, 출입구, 쉼터, 혹은 산봉우리
- 등산코스를 따라 이동하는 중 쉼터 혹은 산봉우리를 방문할 때마다 휴식을 취할 수 있음
- 휴식 없이 이동해야 하는 시간 중 가장 긴 시간을 해당 등산코스의 intensity
- 등산코스에서 출입구는 처음과 끝에 한 번씩, 산봉우리는 한 번만 포함
- 규칙을 지키면서 intensity가 최소가 되도록 등산코스
- intensity가 최소가 되는 등산코스에 포함된 [산봉우리 번호, intensity의 최솟값] return
- intensity가 최소가 되는 등산코스가 여러 개라면 그중 산봉우리의 번호가 가장 낮은 등산코스를 선택

n이 5만개 => DFS는 꿈도 못 꿀듯..

중간에 반드시 summit 중 하나만 포함!
중간에 반드시 다른 gates가 있으면 안 됨!
처음과 마지막은 항상 같아야!

위 조건을 충족한 채로 BFS를 돌려볼까?? => 경로니깐 무조건 DFS..

각 루트의 intensity를 최소로 해야하니깐. 전체 루트의 길이 신경쓰지 말고 
greedy처럼 그때 그때 최저의 루트를 선택하자

아니다. 이렇게하면 길을 반복해서 타거나, 영영 summit으로 못 갈 수도 있음.

그보다는 gate - summit의 루트만 최소가 되면 되니깐.
paths에서 다른 gate, summit의 연결 루트를 다 지워버리자.

DFS 힙을 할 까..? push할 때마다 자동 정렬..

*/

/**
 *
 * @param {number} n n개의 지점
 * @param {[i : number, j: number ,w:number][]} paths i번 지점, j번 지점을 잇는 w만큼의 시간이 걸리는 길
 * @param {number[]} gates 출입구
 * @param {number[]} summits 산봉우리
 * @returns
 */
function solution(n, paths, gates, summits) {
  let answer = [];

  // g번 gate와 s번 summit의 조합
  for (let g = 0; g < gates.length; g++) {
    for (let s = 0; s < summits.length; s++) {
      let filteredPaths = filterPath(
        gates[g],
        summits[s],
        gates,
        summits,
        paths
      );

      console.log("g", gates[g], "s", summits[s]);
      console.log(filteredPaths);
    }
  }

  return answer;
}

/**
 *
 * @param {number} gate
 * @param {number} summit
 * @param {number[]} gates
 * @param {number[]} summits
 * @param {[i : number, j: number ,w:number][]} paths
 * @returns 다른 gate, summit과 연결된 path를 다 지워버림
 */
function filterPath(gate, summit, gates, summits, paths) {
  let otherGates = gates.filter((ele) => ele !== gate);
  let otherSummits = summits.filter((ele) => ele !== summit);

  let filteredPaths = paths.filter((p) => {
    let [i, j, w] = p;
    if (
      otherGates.includes(i) ||
      otherGates.includes(j) ||
      otherSummits.includes(i) ||
      otherSummits.includes(j)
    ) {
      return false;
    } else {
      return true;
    }
  });

  return filteredPaths;
}

solution(
  6,
  [
    [1, 2, 3],
    [2, 3, 5],
    [2, 4, 2],
    [2, 5, 4],
    [3, 4, 4],
    [4, 5, 3],
    [4, 6, 1],
    [5, 6, 1],
  ],
  [1, 3],
  [5]
); // [5, 3]

// solution(
//   7,
//   [
//     [1, 4, 4],
//     [1, 6, 1],
//     [1, 7, 3],
//     [2, 5, 2],
//     [3, 7, 4],
//     [5, 6, 6],
//   ],
//   [1],
//   [2, 3, 4]
// ); // [3, 4]

// solution(
//   7,
//   [
//     [1, 2, 5],
//     [1, 4, 1],
//     [2, 3, 1],
//     [2, 6, 7],
//     [4, 5, 1],
//     [5, 6, 1],
//     [6, 7, 1],
//   ],
//   [3, 7],
//   [1, 5]
// ); // [5, 1]

// solution(
//   5,
//   [
//     [1, 3, 10],
//     [1, 4, 20],
//     [2, 3, 4],
//     [2, 4, 6],
//     [3, 5, 20],
//     [4, 5, 6],
//   ],
//   [1, 2],
//   [5]
// ); //[5, 6]
