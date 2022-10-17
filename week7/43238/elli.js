/*
n명이 대기중.

모든 사람이 심사 받는데 최소 시간 구하기.

1. 입국 심사를 기다리는 사람 최대 10억. 평범하기 1씩 증가해서는 무조건 timeout!

2. 순열을 이용해서 

7분  : 1 2 3 4 5 
10분 : 5 4 4 5 1

해서 가장 작은 시간을 구해볼까?

아니면 1번에서 최대공약수까지는 넘길 수 있다. 그러면 timeout 안 당할 것 같기도?

2번을 고도화해서

sort한 다음 작은 수부터 체크해서 x와 x+1을 비교. (1,5) (2,4) ... 해서 가장 작은수를 저장.
x++한 다음 반복

이분탐색. start와 end를 잡아서 쪼여오면서 답 찾기!!!
*/

function solution(n, times) {
  let answer = 0;

  let start = Math.min(...times);
  let end = Math.max(...times) * n; // 최대 시간 걸리는 곳 * n

  while (start < end) {
    let mid = Math.floor((start + end) / 2);

    // mid
    let count = times.reduce((prev, curr) => prev + Math.floor(mid / curr), 0);

    if (count >= n) {
      end = mid;
    } else if (count < n) {
      start = mid;
    }
    if (end === start + 1) {
      answer = end;
      break;
    }
  }

  console.log(answer);

  return answer;
}

solution(6, [10, 7]); //28

// solution(4, [1, 2, 3]); //3

// solution(4, [3, 6, 7]); // 7
