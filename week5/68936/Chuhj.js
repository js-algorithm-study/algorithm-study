function solution(arr) {
  //  전체를 확인하고 모두 같은 숫자가 아니면 4등분
  let ones = 0;
  let zeros = 0;

  function isSame(array) {
    const firstValue = array[0][0];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (firstValue !== array[i][j]) return false;
      }
    }
    return true;
  }

  function recursive(arr) {
    let len = arr.length;
    // len이 1일 때 까지

    const firstValue = arr[0][0];

    if (len === 1) {
      if (firstValue === 1) ones += 1;
      else zeros += 1;
    } else if (isSame(arr)) {
      // 배열 안의 값이 모두 같은지 확인
      // 같으면 해당 값 count
      if (firstValue === 1) ones += 1;
      else zeros += 1;
    } else {
      // 모두 같지 않다면 4등분하여 재귀
      let half = len / 2;

      let arr1 = Array(half)
        .fill()
        .map(() => Array(half).fill());
      let arr2 = Array(half)
        .fill()
        .map(() => Array(half).fill());
      let arr3 = Array(half)
        .fill()
        .map(() => Array(half).fill());
      let arr4 = Array(half)
        .fill()
        .map(() => Array(half).fill());

      for (let i = 0; i < half; i++) {
        for (let j = 0; j < half; j++) {
          arr1[i][j] = arr[i][j];
        }
      }

      for (let i = 0; i < half; i++) {
        for (let j = 0; j < half; j++) {
          arr2[i][j] = arr[i][j + half];
        }
      }

      for (let i = 0; i < half; i++) {
        for (let j = 0; j < half; j++) {
          arr3[i][j] = arr[i + half][j];
        }
      }

      for (let i = 0; i < half; i++) {
        for (let j = 0; j < half; j++) {
          arr4[i][j] = arr[i + half][j + half];
        }
      }

      recursive(arr1);
      recursive(arr2);
      recursive(arr3);
      recursive(arr4);
    }
  }
  recursive(arr);

  return [zeros, ones];
}

console.log(
  solution([
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ])
);

console.log(
  solution([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ])
);
