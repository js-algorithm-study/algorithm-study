const isPalindrome = (str, len) => {
  let isSame = true;
  for (let i = 0; i <= str.length - len; i++) {
    isSame = true;
    const subStr = str.substr(i, len);
    for (let j = 0; j < Math.floor(subStr.length / 2); j++) {
      if (subStr[j] !== subStr[subStr.length - j - 1]) {
        isSame = false;
        break;
      }
    }
    if (isSame) {
      break;
    }
  }
  return isSame;
};

const solution = (s) => {
  let len = s.length;

  while (len) {
    if (isPalindrome(s, len)) {
      break;
    } else {
      len--;
    }
  }

  return len;
};

console.log(solution("abacde"));
console.log(solution("abcdcba"));
console.log(solution("aaabcdcba"));
