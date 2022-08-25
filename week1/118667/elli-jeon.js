/* 두 큐의 합 같게 만들기

목표: 
필요한 작업의 최소 횟수 구하기

설명: 
한번의 pop + 한번의 insert = 1

[1, 2, 3, 4] => 1 pop [2, 3, 4] => 5 insert [2, 3, 4, 5]

두 큐의 합이 30이면, 각각 15로

핵심:
1. queue1에서 pop해서 queue2로 insert ? => 원형 Queue
2. [queue1, queue2], [queue2, queue1] 이렇게 두 가지 케이스 고려
3. 맨처음 기준 [3, 2, 7, 2] / [4, 6, 5, 1] 이면, 6, 5, 1, 3 이 모여서 15가 됨. [4, 6, 5, 1]에서 4는 빠지고 3이 추가되야 하므로 답은 2
4. 따라서 두 queue를 하나에 모아서 0부터 i까지 n개(2, 3, 4...)씩 모아서 전체 합의 절반이 되는 집합을 찾고, 현재의 queue 상태에서 해당 집합이 되기위해 몇 번 작업이 필요한지 계산. 이를 반복해서 최소 수 구하기


풀이 방법: 
1. 두 배열이 어떤 수가 되어야 하는 지를 찾음. (모두 합해서 나누기 2)
2. 나눌수 없는 홀수가 되면 -1 return
3. 각 배열의 합이 같아질 수 없으면 -1 return
4. 

*/

// Sum of arr's elements
function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

/**
 * Get circular queue Index
 * @param {array} queue
 * @param {number} number
 * @returns
 */
function getIndex(queue, number) {
  const length = queue.length;
  return number % length;
}

/**
 * 이렇게 reduce를 사용하면, 끝에 있는 element는 제대로 된 합을 구할 수 없다. 하지만, queue 두개의 위치를 바꿔서 하면 상관없어진다.
 * @param {array} arr array
 * @param {number} startIdx 시작하는 index
 * @param {number} amount 몇개가 한 묶음인지
 * @returns
 */
function partialSum(arr, startIdx, amount) {
  return arr.reduce((prev, curr, currIdx) => {
    if (
      currIdx >= getIndex(arr, startIdx) &&
      currIdx < getIndex(arr, startIdx) + amount
    ) {
      return prev + curr;
    }
    return prev;
  }, 0);
}

// 1개씩 모아서, 2개씩 모아서, 3개씩 모아서 ....
function isPossible(queue1, queue2) {
  const merged = [...queue1, ...queue2];

  const loop = Math.floor(merged.length / 2) + 1; // 집합 참여 수
  // console.log("loop", loop);
  const halfSum = sum(merged) / 2;

  const answerArr = [];

  for (let i = 0; i < merged.length; i++) {
    for (let j = 1; j <= loop; j++) {
      const groupSum = partialSum(merged, i, j);

      if (groupSum === halfSum) {
        const setResult = {
          start: i,
          end: i + j,
          arr: merged.slice(i, i + j),
        };
        answerArr.push(setResult);
      }
    }
  }

  return answerArr;
}

/**
 *  * 답 찾는 방법 :
 * 1. 해당 queue에서 가장 마지막 수가 queue의 끝(가장 오른쪽)인지 확인한다.
 * 2. if 그렇다면, 해당 queue에서 없어져야하는 수 갯수 + 있어야하는 수 갯수를 더하면 된다.
 * 3. else, 찾아야하는 그룹의 첫 번째 수 앞에(왼쪽)으로 수가 몇개 더 있는지 확인한다. 해당 수 + 그룹의 갯수 + 나머지 queue에 있는 수 갯수
 * @param {array} arr
 * @param {array} queue1
 * @param {array} queue2
 * @returns
 */
function findFastestWay(arr, queue1, queue2) {
  let count = Infinity;

  for (let each of arr) {
    const { start, end, arr } = each;
    console.log(each);

    const queueAEnd = queue1.length - 1;
    const queueBEnd = queue1.length + queue2.length - 1;

    // 첫번째 queue의 end가 우리가 고른 배열의 한 가운데에 있다면.
    if (start <= queueAEnd && queueAEnd < end) {
      // 서로 없는 것들 갯수
      const qq =
        queue1.filter((ele) => !arr.includes(ele)).length +
        arr.filter((ele) => !queue1.includes(ele)).length;

      if (qq < count) {
        count = qq;
      }
    } else {
      // group 길이
      const groupLength = arr.length;
      // 자기 앞에 길이
      let beforeGroupLength = 0;
      // 상대 queue 길이 + 자기 앞에 길이
      let otherQueueLength = 0;

      if (start < queueAEnd) {
        beforeGroupLength = start - 0;
        otherQueueLength = queue2.length;
      } else {
        beforeGroupLength = start - queueAEnd - 1;
        otherQueueLength = queue1.length;
      }

      const qq =
        groupLength + beforeGroupLength + otherQueueLength + beforeGroupLength;

      if (qq < count) {
        count = qq;
      }
    }
  }

  // 없는거임.
  if (count === Infinity) {
    return -1;
  }

  return count;
}

//--- solution ---//

function solution(queue1, queue2) {
  let answer = -2;

  // sum of queues is odd
  if ((sum(queue1) + sum(queue2)) % 2 === 1) {
    return -1;
  }

  const possibleList = isPossible(queue1, queue2);

  answer = findFastestWay(possibleList, queue1, queue2);

  console.log("answer", answer);

  return answer;
}

console.log(solution([3, 2, 7, 2], [4, 6, 5, 1])); // 2
console.log(solution([1, 2, 1, 2], [1, 10, 1, 2])); // 7
console.log(solution([7, 5, 2], [3, 4, 9])); // 7
// console.log(solution([1, 1], [1, 5])); // -1
// console.log(solution([1, 1], [1, 2])); // -1
