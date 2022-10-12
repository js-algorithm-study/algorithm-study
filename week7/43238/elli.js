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
*/

function solution(n, times) {
  let answer = 0;

  times.sort((a, b) => b - a); // time 순서대로

  let x = 0;

  let result = new Array(times.length).fill(0);

  if (n > times.length) {
    result[0] = n > times.length ? n - (times.length - 1) : 0;
  }

  console.log(result, "before");

  let min = Infinity;
  while (x < times.length) {
    const sumExceptX = result.reduce(
      (prev, curr, idx) => (idx !== x && idx !== x + 1 ? prev + curr : 0),
      0
    );
    console.log("x", x, sumExceptX);

    let a = 0;
    let b = 0;
    split(n - sumExceptX).forEach((ele) => {
      const [first, second] = ele;
      const sum = Math.max(first * times[0], second * times[1]);
      console.log("first:", first, times[0], "second:", second, times[1], sum);
      if (min > sum) {
        min = sum;
        a = first;
        b = second;
      }
    });
    if (a !== 0 && b !== 0) {
      result[x] = a;
      result[x + 1] = b;
    }
    console.log(result, "result");
    x++;
  }

  console.log(min);

  return min;
}

function split(num) {
  console.log("num", num);
  const result = [];
  let opponent = 1;

  while (num > 1) {
    result.push([num - 1, opponent]);
    num--;
    opponent++;
  }

  return result;
}

// solution(6, [10, 7]); //28

// solution(4, [1, 2, 3]); //3

solution(4, [3, 6, 7]); // 7
