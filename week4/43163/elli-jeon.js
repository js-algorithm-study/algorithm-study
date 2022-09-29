/* 
한번에 한 개의 알파벳 변경
words에 있는 단어로만 변환 가능
begin => target
가장 짧은 변화 과정? BFS로 해보자.
*/

function solution(begin, target, words) {
  let answer = 0;

  if (!words.includes(target)) {
    console.log(answer);
    return answer;
  }

  const BFS = (word, count) => {
    let queue = [];

    queue.push([word, count]);

    while (queue.length > 0) {
      // @ts-ignore
      let [begin, cnt] = queue.shift();
      console.log(begin, cnt);
      console.log(words);

      if (begin === target) {
        console.log(cnt);
        return cnt;
      }

      words.forEach((w) => {
        if (isChangeable(begin, w)) {
          words = words.filter((f) => f !== w); // 지나온 것 삭제
          queue.push([w, cnt + 1]);
        }
      });
    }

    console.log("answer", answer);
    return 0;
  };

  answer = BFS(begin, 0);

  return answer;
}

/**
 * 단어가 서로 하나만 다르다면.
 * @param {string} begin
 * @param {string} target
 */
function isChangeable(begin, target) {
  let count = 0;
  for (let i = 0; i < begin.length; i++) {
    if (begin[i] !== target[i]) {
      count++;
    }
  }
  if (count === 1) {
    return true;
  } else {
    return false;
  }
}

// solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]);
solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]);
