/*

다양한 선수들의 우승. 

전대 우승자 라이언. 라이언에게 불리하게

어피치 n발 쏘고 라이언 n발

k점(1~10)을 어피치가 a발, 라이언이 b발. a >= b 이면 어피치에게 k점 (단 a=b=0이면 점수 x)

최종 점수가 같으면 어피치 우승

이제 라이언이 쏠 차례. 라이언이 어피치를 큰 점수 차이로 이기기 위해 n발을 어디에 쏴야하나??

화살의 개수 자연수 n, 어피치의 점수를 10부터 0까지 배열 info

HINT!

특정 점수에서 어피치가 맞춘 화살 갯수를 넘기느냐 마느냐를 체크하자.
ex) 10점에서 1발을 맞췄다면, 0발?? 2발이냐??

두개의 선택지 + 11개 forEach?? DFS!!

*/

/**
 *
 * @param {number} index
 * @returns score
 */
function score(index) {
  return 10 - index;
}

/**
 *
 * @param {array} appeach
 * @param {array} lion
 */
function compare(appeach, lion) {
  let appeachScore = 0;
  let lionScore = 0;

  appeach.forEach((ele, index) => {
    if (ele === 0 && lion[index] === 0) {
      return;
    }
    if (ele >= lion[index]) {
      appeachScore += score(index);
    } else {
      lionScore += score(index);
    }
  });

  console.log(appeachScore, lionScore, `점수차 : ${lionScore - appeachScore}`);
  return lionScore - appeachScore;
}

/**
 *
 * @param {array} lion
 * @param {number} index
 * @param {number} count 과녁에 꽂힌 화살 수
 * @returns
 */
function concatLion(lion, index, count) {
  return [...lion.slice(0, index), count, ...lion.slice(index + 1)];
}

/**
 * 만약 diff가 같다면, 더 낮은 쪽에 화살이 많이 박힌 애를 고름
 * @param {array} lion1
 * @param {array} lion2
 */
function compareLowPoints(lion1, lion2) {
  for (let i = lion1.length - 1; i >= 0; i--) {
    if (lion1[i] > lion2[i]) {
      return lion1;
    } else if (lion1[i] < lion2[i]) {
      return lion2;
    }
  }
  return lion1;
}

// --- //

function solution(n, info) {
  let answer = [];

  let appeach = [...info];
  let lion = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let maxDiff = -Infinity; // lionscore - appeachscore
  let answerLion = [];

  const DFS = (n, idxNum, appeach, lion) => {
    if (idxNum === 10) {
      lion[idxNum] = n; //남은것 다 쏟아붓기
      const diff = compare(appeach, lion);
      if (diff === maxDiff) {
        answerLion = [...compareLowPoints(answerLion, lion)];
      }
      if (diff > maxDiff) {
        maxDiff = diff;
        answerLion = [...lion];
      }
      return;
    }

    const appeachCount = appeach[idxNum];
    // 가능한 케이스 0을 주거나 appeach보다 높아서 가져오거나
    const possible = [0, appeachCount + 1];
    possible.forEach((count) => {
      if (n - count >= 0) {
        DFS(n - count, idxNum + 1, appeach, concatLion(lion, idxNum, count));
      }
    });
  };

  DFS(n, 0, appeach, lion);

  console.log("---");
  if (maxDiff <= 0) {
    console.log("lion은 appeach를 이길 수 없다.");
    return [-1];
  }
  //console.log(maxDiff, answerLion);

  return answerLion;
}

console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0])); // [0,2,2,0,1,0,0,0,0,0,0]
console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])); // [-1]
console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1])); // [1,1,2,0,1,2,2,0,0,0,0]
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3])); // [1,1,1,1,1,1,1,1,0,0,2]
