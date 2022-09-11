function solution(n, info) {
  let answer = [];
  let max = 0;
  info.forEach((c, i) => {
    let remain = n;
    let tmpAnswer = [];
    let ryanSum = 0;
    let apeachSum = 0;
    info.forEach((count, index) => {
      if (remain >= 0 && remain - count - 1 >= 0 && i - 1 !== index) {
        remain = remain - count - 1;
        tmpAnswer.push(count + 1);
        ryanSum += 10 - index;
      } else {
        tmpAnswer.push(0);
        if (count > 0) apeachSum += 10 - index;
      }

      if (index === info.length - 1) {
        if (remain > 0) {
          tmpAnswer[info.length - 1] = remain;
        }
        if (ryanSum - apeachSum > max) {
          answer = [...tmpAnswer];
          max = ryanSum - apeachSum;
        }
        if (ryanSum - apeachSum === max && max > 0) {
          answer.forEach((a, index) => {
            if (a < tmpAnswer[index + 9]) {
              answer = [...tmpAnswer];
            }
          });
        }
      }
    });
  });
  return answer.length === 0 ? [-1] : answer;
}

console.log(solution(3, [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]));
