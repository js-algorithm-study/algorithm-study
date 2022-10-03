const solution = (arr) => {
  let [oneCount, zeroCount] = [0, 0];

  const quadCompress = (arr, n) => {
    const newArray = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        newArray.push(arr[i][j]);
      }
    }
    if (newArray.every((b) => b === 0)) return zeroCount++;
    if (newArray.every((a) => a === 1)) return oneCount++;

    const arr1 = arr.slice(0, n / 2);
    const arr2 = arr.slice(n / 2);

    if (n <= 1) return;
    const quadArr1 = arr1.map((a) => a.slice(0, n / 2));
    const quadArr2 = arr1.map((a) => a.slice(n / 2));
    const quadArr3 = arr2.map((a) => a.slice(0, n / 2));
    const quadArr4 = arr2.map((a) => a.slice(n / 2));

    quadCompress(quadArr1, n / 2);
    quadCompress(quadArr2, n / 2);
    quadCompress(quadArr3, n / 2);
    quadCompress(quadArr4, n / 2);
  };

  quadCompress(arr, arr.length);

  return [zeroCount, oneCount];
};

console.log(
  solution([
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ])
);
