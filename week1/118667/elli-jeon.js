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

// arr에서는 pop시키고 그 element return
function pop(arr) {
  return arr.shift();
}

// arr 뒤에 element push
function insert(arr, ele) {
  arr.push(ele);
}

// pop and insert
function work(popQueue, insertQueue) {
  console.log(`from ${popQueue} / ${insertQueue}`);
  const popped = pop(popQueue);
  insert(insertQueue, popped);
  console.log(`pop ${popped} and insert`);
  console.log(`from ${popQueue} / ${insertQueue}`);
  console.log("------");
}

// sum of arr's elements
function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}

// 1개씩 모아서, 2개씩 모아서, 3개씩 모아서 ....
function isPossible(queue1, queue2) {
  const merged = [...queue1, ...queue2];

  const loop = merged.length / 2 + 1;

  for (let i = 1; i < loop; i++) {}
}

//--- solution ---//

function solution(queue1, queue2) {
  let answer = -2;

  // sum of queues is odd
  if ((sum(queue1) + sum(queue2)) % 2 === 1) {
    return -1;
  }

  // 가장 큰 수와

  return answer;
}

console.log(solution([3, 2, 7, 2], [4, 6, 5, 1])); // 2
console.log(solution([1, 2, 1, 2], [1, 10, 1, 2])); // 7
console.log(solution([1, 1], [1, 5])); // -1
console.log(solution([1, 1], [1, 2])); // -1
