const isOneDiff = (str1, str2) => {
  let diffCount = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) diffCount++;
  }
  return diffCount === 1;
};

function solution(begin, target, words) {
  const map = new Map();
  const queue = [[begin, 0]];
  words.unshift(begin);

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (isOneDiff(words[i], words[j])) {
        const mapWord = map.get(words[i]) || [];
        mapWord.push(words[j]);
        map.set(words[i], mapWord);
      }
    }
  }

  if (!words.includes(target)) return 0;

  while (queue.length) {
    let [word, count] = queue.shift();
    console.log(word, count);
    if (word === target) return count;
    count++;
    if (map.has(word)) {
      map.get(word).forEach((w) => {
        queue.push([w, count]);
      });
    }
  }
}

console.log(solution("hit", "cog", ["cog", "log", "lot", "dog", "hot"]));

// hit -> hot -> lot -> log -> cog
