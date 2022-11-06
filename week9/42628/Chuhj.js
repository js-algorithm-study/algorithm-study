function solution(operations) {
  const queue = [];

  for (const oper of operations) {
    const [cmd, data] = oper.split(' ');

    if (cmd === 'I') {
      queue.push(data);
    } else if (cmd === 'D') {
      if (data === '1') {
        queue.sort((a, b) => a - b);
        queue.pop();
      } else if (data === '-1') {
        queue.sort((a, b) => b - a);
        queue.pop();
      }
    }
  }

  if (queue.length === 0) return [0, 0];

  queue.sort((a, b) => a - b);
  return [Number(queue[queue.length - 1]), Number(queue[0])];
}

console.log(solution(['I 16', 'I -5643', 'D -1', 'D 1', 'D 1', 'I 123', 'D -1']));
