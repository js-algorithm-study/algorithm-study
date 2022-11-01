function solution(operations) {
  const queue = [];
  operations.forEach((operation) => {
    const [operator, number] = operation.split(" ");
    if (operator === "I") {
      queue.push(Number(number));
    }
    if (operator === "D") {
      if (number === "-1" && queue.length > 0) {
        const index = queue.indexOf(Math.min(...queue));
        queue.splice(index, 1);
      }
      if (number === "1" && queue.length > 0) {
        const index = queue.indexOf(Math.max(...queue));
        queue.splice(index, 1);
      }
    }
  });
  return queue.length === 0 ? [0, 0] : [Math.max(...queue), Math.min(...queue)];
}

/* console.log(
  solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"])
); */

console.log(
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
  ])
);
