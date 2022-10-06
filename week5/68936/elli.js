/* 
arr은 0,1로 이루어진 2^n x 2^n

1. 압축하고자 하는 영역 S
2. S내부가 모두 같은 수라면, 하나로 압축
3. 그렇지 않다면 S를 균일한 4개의 정사각형으로 쪼개서 반복

배열에 최종적으로 남는 0,1의 개수를 return

압축을 하면서, 압축이 되는 경우라면 -1로

arr을 재귀적으로 내려보내면서 조건에 부합하는 경우, 기존 arr을 치환하지말고 빈 배열에다가 push해서 모아둠. 
*/

function solution(arr) {
  let answer = [];
  let len = arr.length;
  let n = Math.log(len) / Math.log(2); // 2^n

  let answers = [];
  repeat(arr, n, answers);

  console.log("ans", answers);
  let a = 0; //0 개수
  let b = 0; // 1개수

  answers.forEach((ans) => {
    ans.forEach((ele) => {
      if (ele === 0) {
        a++;
      }
      if (ele === 1) {
        b++;
      }
    });
  });

  console.log(a, b);

  return [a, b];
}

/**
 *
 * @param {array} arr 작업 대상 array
 * @param {number} n 해당 array의 길이 2^n
 * @param {array} answers return하는 것이 아니라 여기에 push
 * @returns
 */
function repeat(arr, n, answers) {
  // 하나 남은 경우,
  if (arr.length === 1 || n < 0) {
    return answers.push(...arr);
  }

  let all0 = allSame(arr, 0);
  let all1 = allSame(arr, 1);

  if (all0) {
    arr = arr.map((row, rowIdx) =>
      row.map((col, colIdx) => (rowIdx === 0 && colIdx === 0 ? 0 : -1))
    );
    answers.push(...arr);
  } else if (all1) {
    arr = arr.map((row, rowIdx) =>
      row.map((col, colIdx) => (rowIdx === 0 && colIdx === 0 ? 1 : -1))
    );
    answers.push(...arr);
  } else {
    // 4개로 쪼개기
    // 2^3 8 => 2^2
    n = n - 1;
    let newLength = Math.pow(2, n); // 0~4 / 4~8
    let arr1 = [],
      arr2 = [],
      arr3 = [],
      arr4 = [];

    for (let x = 0; x < newLength; x++) {
      let row = arr[x].slice(0, newLength);
      arr1.push(row);
    }

    for (let x = 0; x < newLength; x++) {
      let row = arr[x].slice(newLength);
      arr2.push(row);
    }

    for (let x = newLength; x < arr.length; x++) {
      let row = arr[x].slice(0, newLength);
      arr3.push(row);
    }

    for (let x = newLength; x < arr.length; x++) {
      let row = arr[x].slice(newLength);
      arr4.push(row);
    }

    repeat(arr1, n, answers);
    repeat(arr2, n, answers);
    repeat(arr3, n, answers);
    repeat(arr4, n, answers);
  }
}

/**
 *
 * @param {array} all
 * @param {number} target 0,1
 * @returns
 */
function allSame(all, target) {
  let result = true;

  for (let i = 0; i < all.length; i++) {
    for (let j = 0; j < all.length; j++) {
      if (all[i][j] !== target) {
        result = false;
        break;
      }
    }
  }

  return result;
}

// solution([
//   [1, 1, 0, 0],
//   [1, 0, 0, 0],
//   [1, 0, 0, 1],
//   [1, 1, 1, 1],
// ]); //[4,9]

// solution([
//   [0, 0],
//   [0, 0],
// ]);

// solution([
//   [1, 1, 1, 1, 1, 1, 1, 1],
//   [0, 1, 1, 1, 1, 1, 1, 1],
//   [0, 0, 0, 0, 1, 1, 1, 1],
//   [0, 1, 0, 0, 1, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0, 1, 1],
//   [0, 0, 0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 1, 0, 0, 1],
//   [0, 0, 0, 0, 1, 1, 1, 1],
// ]); // [10,15]

/**
 *
 * @param {Array} arr
 */
function print(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
