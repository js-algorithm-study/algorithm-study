function solution(stones, k) {
  const max = Math.max(...stones);

  let start = 0;
  let end = max;

  while (start <= end) {
    let mid = Math.ceil((start + end) / 2);
    let count = 0;

    for (const stone of stones) {
      if (stone <= mid) {
        count += 1;
      } else {
        count = 0;
      }
      if (count >= k) break;
    }

    if (count >= k) end = mid - 1;
    else start = mid + 1;
  }

  return start;
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3));
console.log(solution([1], 1));
