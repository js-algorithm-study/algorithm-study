class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  insert(num) {
    this.queue.push(num);
    this.sort();
  }

  sort() {
    this.queue.sort((a, b) => a - b);
  }

  removeMax() {
    this.queue.pop();
  }

  removeMin() {
    this.queue.shift();
  }

  answer() {
    if (this.queue.length === 0) {
      return [0, 0];
    } else {
      let min = this.queue[0];
      let max = this.queue[this.queue.length - 1];
      return [max, min];
    }
  }
}

function solution(operations) {
  let answer = [];

  let queue = new PriorityQueue();

  console.log(operations);

  operations.forEach((ele) => {
    let [sign, num] = ele.split(" ");
    if (sign === "I") {
      queue.insert(Number(num));
    }
    if (sign === "D") {
      if (num === "1") {
        queue.removeMax();
      }
      if (num === "-1") {
        queue.removeMin();
      }
    }
  });

  console.log(queue.answer());

  return queue.answer();
}

solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"]); //[0,0]

solution([
  "I -45",
  "I 653",
  "D 1",
  "I -642",
  "I 45",
  "I 97",
  "D 1",
  "D -1",
  "I 333",
]); //[333, -45]
