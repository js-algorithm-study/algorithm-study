/* 
- 앞뒤를 뒤집어도 똑같은 문자열을 팰린드롬
- 문자열 s가 주어질 때, s의 부분문자열(Substring)중 가장 긴 팰린드롬의 길이를 return

이중 for문을 만들어서 첫번째 for문은 mid, 두번째 for문은 mid - j, mid + j의 j를
문제는, 효율성...
reverse하면 안댐.

해답 :

좌우에서 하나씩 지워가기..

abcdcba

0. 안 지우기 : STOP
1. 좌에서 1개 지우기, 우에서 1개 지우기 : bcdcba. abcdcb
2. 좌에서 2개, 우에서 2개, 좌우에서 1개 : cdcba, abcdc, bcdcba
3. 

쉬운거였는데 slice를 쓰면 안된다는 말에 slice 안 쓰고 했다가 눈 뽑히는줄;;
slice를 써서 자른 str을 check 함수에 넘겨주고, 그 안에서 slcie랑 reverse 쓰지 않고 index를 사용해서 단순 비교.
하나는 처음부터 위로, 다른 하나는 마지막 부터 아래로.


*/

function solution(s) {
  let answer = 1;
  let sLen = s.length;

  for (let del = 0; del < s.length; del++) {
    // console.log("del:", del);

    for (let i = 0; i <= del; i++) {
      let left = i;
      let right = del - i;
      // console.log(left, right, "left", "right");

      // console.log(left, sLen - 1 - right);

      // s[left] ~ s[len - 1 - right] 비교

      const chk = check(s.slice(left, sLen - right));

      if (chk) {
        answer = sLen - del;

        console.log("ans", answer);
        return answer;
      } // 찾으면 제일 큰겨
    }
  }

  console.log("ans", answer);
  return answer;
}

// min, max포함
function check(str) {
  // console.log(str);
  const mid = Math.floor(str.length);

  for (let i = 0; i < mid; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }

  return true;
}

// solution("abcdcba"); // 7
solution("abacde"); // 3
solution("qwerrewq"); // 8
solution("ababab"); // 5
solution("a"); // 1
solution("abbb"); // 3
solution("aaaa"); // 4
solution("abba"); //4
solution("abaabaaaaaaa"); // 7
solution("abcbaqwertrewqq"); //9
solution("abcbaqwqabcba"); // 13
solution("abcabcdcbae"); //7
solution("abcde"); // 1
