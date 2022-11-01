/*
10 20 10 30 20 50



10
=> 10
dp[1] = 1

10 20
=> 10 20
dp[2] = dp[1] + 1

10 20 10
=> 10
dp[3] = 1

10 20 10 30
=> 10 20 30
dp[4] = dp[2] + 1

10 20 10 30 20
=> 10 20
dp[5] = dp[2]

10 20 10 30 20 50
=> 10 20 30 50
dp[6] = dp[4] + 1

결론 : n번째 수보다 작은 수들의 부분 수열 + 1

for(i){
	max;
	for(j < i){
		if (A[i]> A[j])
			여기서 max dp를 찾는다.
	}

	dp[i] = max dp + 1;
}
*/

let fs = require("fs");
let path = "/dev/stdin";

let testPath = "../test.txt";

// let input = fs.readFileSync(path).toString().split(" ");
let inputs = fs.readFileSync(testPath).toString().split("\r\n"); // linux \n window \r\n

// console.log(inputs);

const size = Number(inputs[0]);
const A = inputs[1].split(" ").map((ele) => Number(ele));

// @ts-ignore
let dp = new Array(size).fill(0);

//
for (let i = 0; i < A.length; i++) {
  let max = 0;

  // console.log("before max", max);
  for (let j = 0; j < i; j++) {
    if (A[i] > A[j]) {
      max = Math.max(dp[j], max);
    }
  }
  // console.log("after max", max);
  dp[i] = max + 1;
  // console.log(dp[i], "i");
}

console.log(Math.max(...dp));
