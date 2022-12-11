// function solution(s) {
//   // 시간초과
//   function getPalinLength(s) {
//     const length = s.length;
//     const a = s.substring(0, Math.floor(s.length / 2));
//     const b = s.substring(Math.ceil(s.length / 2));
//     return a === b.split('').reverse().join('') ? length : 0;
//   }
//   let answer = 1;

//   for (let i = 0; i < s.length - 1; i++) {
//     for (let j = i + 2; j <= s.length; j++) {
//       answer = Math.max(answer, getPalinLength(s.substring(i, j)));
//     }
//   }

//   return answer;
// }

// function solution(s) {
//   // 시간초과
//   let answer = 1;

//   for (let i = 0; i < s.length - 1; i++) {
//     for (let len = 2; len <= s.length - i; len++) {
//       let a = '';
//       let b = '';

//       for (let k = i; k < i + Math.floor(len / 2); k++) {
//         a += s[k];
//         b += s[i + len - k + i - 1];
//       }
//       console.log(a, b, i, len);
//       if (a === b) {
//         answer = len > answer ? len : answer;
//       }
//     }
//   }

//   return answer;
// }

// function solution(s) {
//   // 효율 1번만 통과
//   let answer = 1;

//   for (let i = 0; i < s.length - 1; i++) {
//     for (let len = 2; len <= s.length - i; len++) {
//       let isPalin = true;

//       for (let k = i; k < i + Math.floor(len / 2); k++) {
//         if (s[k] !== s[i + i + len - k - 1]) {
//           isPalin = false;
//           break;
//         }
//       }
//       if (!isPalin) continue;

//       answer = len > answer ? len : answer;
//     }
//   }

//   return answer;
// }

// function solution(s) {
//   // 효율 1번만 통과
//   let answer = 1;

//   if (s.length === 1) return 1;

//   if (s.length === 2) return s[0] === s[1] ? 2 : 1;

//   for (let len = 3; len < s.length; len++) {
//     for (let i = 0; i <= s.length - len; i++) {
//       const mid = i + Math.floor(len / 2);
//       let left = mid - 1;
//       let right = len % 2 === 0 ? mid : mid + 1;

//       while (left >= 0 && right < s.length) {
//         if (s[left] !== s[right]) {
//           break;
//         }
//         left -= 1;
//         right += 1;
//       }
//       const palinLen = right - left - 1;
//       answer = palinLen > answer ? palinLen : answer;
//     }
//   }

//   return answer;
// }

function solution(s) {
  let answer = 1;

  if (s.length === 1) return 1;

  if (s.length === 2) return s[0] === s[1] ? 2 : 1;

  for (let len = 3; len <= s.length; len++) {
    for (let i = 0; i <= s.length - len; i++) {
      const mid = i + Math.floor(len / 2);
      let left = mid - 1;
      let right = len % 2 === 0 ? mid : mid + 1;

      if (len < answer) continue;

      while (left >= 0 && right < s.length) {
        if (s[left] !== s[right]) {
          break;
        }
        left -= 1;
        right += 1;
      }
      const palinLen = right - left - 1;
      answer = palinLen > answer ? palinLen : answer;
    }
  }

  return answer;
}

console.log(solution('abcdcba'));
console.log(solution('abacde'));
console.log(solution('fabac'));
console.log(solution('abbb'));
