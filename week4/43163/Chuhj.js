function solution(begin, target, words) {
  // words중에 한 글자만 다른 글자를 찾음
  // bfs
  if (!words.includes(target)) return 0;

  let visited = words.reduce((acc, word) => {
    if (!acc[word]) acc[word] = false;
    return acc;
  }, {});

  let queue = [[begin, 0]];

  while (queue.length > 0) {
    const [word, count] = queue.shift();
    if (visited[word]) continue;
    visited[word] = true;

    if (word === target) return count;
    let oneDifferWords = words.filter((w) => {
      // 한 글자만 다른 단어만 찾음
      let differCount = 0;

      for (let i = 0; i < w.length; i++) {
        if (word[i] !== w[i]) differCount += 1;
      }
      return differCount === 1;
    });

    for (const word of oneDifferWords) {
      queue.push([word, count + 1]);
    }
    console.log(queue);
  }

  return 0;
}

console.log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']));
