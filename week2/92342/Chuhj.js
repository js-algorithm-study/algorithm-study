function solution(n, info) {
  let answer = [];
  let gap = 0;
  let banned = [];

  for (let j = 0; j < 2; j++) {
    let ryan = 0;
    let apeach = 0;
    const scores = [];

    let remain = n;
    for (let i = 0; i < info.length; i++) {
      const score = 10 - i; // 큰 점수부터 순회
      if (banned.includes(i)) {
        if (info[i] > 0) apeach += score;
        scores.push(0);
        continue;
      }

      if (remain >= info[i] + 1) {
        // 해당 점수에 쏠 수 있다면 쏨
        remain -= info[i] + 1;
        ryan += score;
        scores.push(info[i] + 1);
      } else if (info[i] > 0) {
        // 쏠 수 없는 점수이고 어피치가 이미 쏴놓은 점수라면 어피치 점수+
        apeach += score;
        scores.push(0);
      } else {
        // 쏠 수 없다면 쏘지않음
        scores.push(0);
      }

      if (i === info.length - 1) {
        // 0점을 쏘는 순서인데 화살이 남아있다면 0점에 모두 쏨
        scores[i] = remain;
      }
    }
    console.log(remain, ryan, apeach);
    console.log(scores);
    if (gap < ryan - apeach) {
      // 어피치와 라이언의 차이가 이전보다 많이 난다면 답으로 함
      gap = Math.max(gap, ryan - apeach);
      answer = scores;
      const max = Math.max(...scores);
      banned.push(scores.indexOf(max, banned[banned.length - 1] + 1));
      // 가장 많이 쏜 곳을 다음번엔 쏘지않게 함
    }
  }
  return answer.length > 0 ? answer : [-1];
}
