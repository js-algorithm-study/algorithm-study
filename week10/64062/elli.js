/* 
디딤돌 숫자 한 번 밟을 때마다 -1
숫자가 0이 되면 더 이상 못 밟고, 그 다음 디딤돌로 갈 수 있음
한 번에 한 명씩

예시의 경우, 
k가 3이라면, 연속 0이 3개 나오는 순간이 마지막.

while 문으로 돌려서 for 문으로 -1?? 방법은 맞으나 call stack max

최대 몇 명까지 건널 수 있는가??

answer을 ++ 하면서 돌리는 것도 너무 커서 효율성이 다 안 된다.

min, max의 중간부터 시작해서 divide / conquer을 할까??

---

k개의 수를 고정으로 한 슬라이딩 윈도우를 해보라네.

그냥 중간부터 이분탐색만 생각했지

이분탐색으로 해결. 이분탐색 오랜만이라 어케하는지 까먹었었다. 기억해두자!!

슬라이딩 윈도우로 구현하려했는데 배열이라서 그런지 시간 오바 나더라고..


*/

function check(stones, k, x) {
  let count = 0;

  for (let i = 0; i < stones.length; i++) {
    if (stones[i] <= x) {
      count++;
    } else {
      count = 0;
    }
    if (count >= k) {
      return false;
    }
  }

  return true;
}

function solution(stones, k) {
  let start = 0;
  let end = 200000000;

  while (start <= end) {
    let mid = start + Math.floor((end - start) / 2);

    if (check(stones, k, mid)) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  console.log(start);
  return start;
}

solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3);
