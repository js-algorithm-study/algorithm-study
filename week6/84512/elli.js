/*
A E I O U 로 이루어진 최대 5글자 사전

A AA AAA AAAA AAAAA AAAAE AAAAI AAAAO AAAAU AAAE



word는 몇번째 단어인가?



아이디어 A, E, I, O, U, "" 를 DFS를 활용해서 가능한 word(배열)들을 만들어낸다.
해당 word들을 string으로 join하고, set로 중복제거하고 sort.
같은 작업들이 모든 알파벳에서 동일하게 적용되므로 "EIO" 같은 단어는 "AIO"로 치환해서
몇 번째 인지 구한다.
*/

function solution(word) {
  let answer = 0;

  const alpa = ["A", "E", "I", "O", "U", ""];

  let possible = [];

  const DFS = (ans) => {
    if (ans.length === 5) {
      possible.push(ans.join(""));
      return;
    }

    alpa.forEach((ele) => {
      DFS([...ans, ele]);
    });
  };

  DFS(["A"]);

  const { size, dict } = getDictionary(possible, "A");

  // console.log(dict);

  const newWord = word.length === 1 ? "A" : "A" + word.slice(1);

  // console.log(newWord);

  const order = alpa.indexOf(word[0]);

  // console.log(order * size + dict.indexOf(newWord) + 1, "Ans");

  return order * size + dict.indexOf(newWord) + 1;

  // return answer;
}

const getDictionary = (possible, firstWord) => {
  const set = new Set(possible);

  const size = set.size;

  const dict = Array.from(set).sort();

  return { size, dict };
};

solution("A");
solution("AAAE");
solution("I");
solution("EIO");
