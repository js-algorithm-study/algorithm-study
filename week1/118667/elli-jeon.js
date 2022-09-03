/*

하나의 queue에서 pop + 다른 queue로 push 가 1회

두개의 queue를 이어서 하나의 원형 queue로 생각하자

 */

/**
 *
 * @param {array} queue queue
 * @param {number} index 숫자
 * @returns 원형 queue의 index
 */
function circularQueueIndex(queue, index) {
  return index % queue.length;
}

function arraySum(queue) {
  return queue.reduce((prev, curr) => prev + curr, 0);
}

function solution(queue1, queue2) {
  let answer = -2;

  const changeAnswer = (result) => {
    if (result < answer) {
      answer = result;
    }
  };

  const circularQueue = [...queue1, ...queue2];
  const circularQueueSum = arraySum(circularQueue);

  // 목표 : 합계가 circularQueueSum / 2 가되는 group을 찾아라.
  if (circularQueueSum % 2 === 1) {
    return -1;
  }

  const targetSum = circularQueueSum / 2;

  // 0 1 2 3 4 5 6 7

  // i : start index, j : group length
  const groups = [];
  for (let i = 0; i < circularQueue.length; i++) {
    for (let j = 1; j <= circularQueue.length; j++) {
      // queue 끝에서부터 시작까지 걸칠때.
      if (i + j > circularQueue.length) {
        const group = [
          ...circularQueue.slice(i),
          ...circularQueue.slice(0, circularQueueIndex(circularQueue, i + j)),
        ];
        const startIndex = i;
        const groupLength = j;
        if (arraySum(group) === targetSum) {
          groups.push({
            group,
            startIndex,
            groupLength,
          });
        }
      } else {
        const group = circularQueue.slice(i, i + j);
        const startIndex = i;
        const groupLength = j;
        if (arraySum(group) === targetSum) {
          groups.push({
            group,
            startIndex,
            groupLength,
          });
        }
      }
    }
  }

  //  [3, 2, 7, 2]	[4, 6, 5, 1]

  // 어차피 두쌍씩 들어와있을 것임. 여기서 circularQueue의 끝. 마지막 index를 포함하고 있느냐 아니냐에 따라 구분
  groups.forEach((info) => {
    // group : startIndex <= < (startIndex + groupLength)
    // queue1 : 0 <= < queue1.length / queue2 : queue1.length <= < queue2.length - 1
    const { group, startIndex, groupLength } = info;
    const lastIndex = startIndex + groupLength; // 불포함
    console.log(info);

    // 1. queue1 ~ quque1
    // if (0 <= startIndex && lastIndex <= queue1.length) {
    //   if (lastIndex === queue1.length) {
    //     const result = queue1.slice(0, startIndex).length;
    //     changeAnswer(result);
    //   } else {

    //   }
    // }

    // 2. queue1 ~ queue2
    // 3. queue2 ~ queue2
    // 4. queue2 ~ queue1
    // 5. ququq1 ~ quque2 ~ queue1
    // 6. queue2 ~ queue1 ~ queue2
  });

  return -2;
}

solution([3, 2, 7, 2], [4, 6, 5, 1]); // 2
solution([1, 2, 1, 2], [1, 10, 1, 2]); // 7
solution([1, 1], [1, 5]); // -1
