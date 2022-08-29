/*
배열 안의 숫자들로 target을 만들 수 있는 방법의 수. 순서는 바꾸지 않음.

각 숫자의 앞에 - 혹은 +. [1, 1, 1, 1, 1]이면 2^5의 경우의 수

*/

class BNode {
  constructor(data, left, right, next) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
    this.next = next;
  }
}

function solution(numbers, target) {
  let answer = 0;

  const chain = createChain(numbers);
  console.log(chain);

  const result = createBranch(chain, chain[0], []);
  console.log(result);

  return answer;
}

solution([4, 1, 2, 1], 4);

function createChain(arr) {
  const chain = [];
  for (let i = 0; i < arr.length; i++) {
    const node = new BNode(arr[i], -arr[i + 1], arr[i + 1]);

    node.next = i + 1;
    if (i + 1 >= arr.length) {
      node.next = null;
    }

    chain.push(node);
  }
  for (let i = 0; i < arr.length; i++) {
    const node = new BNode(-arr[i], -arr[i + 1], arr[i + 1]);

    node.next = i + 1;
    if (i + 1 >= arr.length) {
      node.next = null;
    }

    chain.push(node);
  }
  return chain;
}

function createBranch(chain, node, branch) {
  if (node.data) {
    branch.push(node.data);
  }

  if (![node.left] && ![node.right]) {
    return branch;
  }

  for (let j = 0; j < chain.length; j++) {
    chain[j].data === chain.left && createBranch(chain, chain[j], branch);
    chain[j].data === chain.right && createBranch(chain, chain[j], branch);
  }
}

function arraySum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0);
}
