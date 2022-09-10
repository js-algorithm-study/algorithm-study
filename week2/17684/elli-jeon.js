/* 
압축 과정

1. 길이가 1인 모든 단어 포함
2. 현재 입력과 일치하는 가장 긴 문자열 w
3. w에 해당하는 색인번호 출력 후 입력에서 w 제거
4. 입력에서 처리되지 않은 문자 c는 w+c 등록
5. 2번으로

*/

function solution(msg) {
  let answer = [];
  let dict = {};

  // A~Z까지 포함된 dict 구성
  for (let i = 1; i <= 26; i++) {
    const char = String.fromCharCode(i + 64);
    dict[char] = i;
  }

  // start~end까지 dict를 뒤져서 dict에 없으면 넣어주고 이전 것을 answer에 push
  for (let start = 0; start < msg.length; start++) {
    for (let end = start; end < msg.length; end++) {
      let prevChar = msg.slice(start, end);
      let currChar = msg.slice(start, end + 1);
      console.log("start, end, prev, curr", start, end, prevChar, currChar);

      // 아래에서 잘 됫는데 마지막 부분이 미흡하길래 추가한 조건.
      if (end + 1 === msg.length) {
        // 마지막 부분에서 현재것이 없으면 이전것을 추가하는데,
        // 현재 것이 end가 끝에 도달해서 이런식의 체크가 불가능한 상황.
        // 현재것 dict에 있는지 체크하고 console.log, start = end로 안 해놓으면 맨마지막거 또 print함.
        // 하다보니 때려맞춤..
        if (dict[currChar]) {
          console.log("endddd", currChar, dict[currChar]);
          answer.push(dict[currChar]);
          start = end; // 끝에서는 이렇게
        }
      }

      if (!dict[currChar]) {
        // 없으면 넣어주기
        dict[currChar] = Object.values(dict).length + 1;
        //없으면 이전것 채택!
        answer.push(dict[prevChar]);
        start = end - 1;
        // KA가 사전에 있으면 한 글자라고 봐야함. start++에 상관없이 end의 뒤로 시작지점 옮김
        // (솔직히 좀 찍음ㅋㅋ;)
        break;
      }
    }
  }

  return answer;
}

console.log(solution("KAKAO"));
console.log(solution("TOBEORNOTTOBEORTOBEORNOT"));
console.log(solution("ABABABABABABABAB"));
