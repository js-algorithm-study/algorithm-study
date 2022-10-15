const solution = (n, times) => {
  let answer = 0;
  let lt = Math.min(...times);
  let rt = n * Math.max(...times);

  while (lt <= rt) {
    let mid = parseInt((lt + rt) / 2);

    // 60분 기준으로 60/10 + 60/7 = 14명
    let count = times.reduce((acu, cur) => acu + Math.floor(mid / cur), 0);

    // 더 큰 인원을 체크 하는 시간이라면 답이 더 작은 쪽에 있다는 것임
    if (count >= n) {
      answer = mid;
      rt = mid - 1;
    }
    // 더 큰 쪽에 있다는 것임
    else {
      lt = mid + 1;
    }
  }

  return answer;
};

console.log(solution(6, [7, 10]));
