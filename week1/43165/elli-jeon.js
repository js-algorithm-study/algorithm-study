/*

1. [1, 1, 1, 1, 1] => 3이 되야 함.
2**5

너무 넓게 생각했음. DFS라서 전체 그래프를 보고... 2**5개수 만큼 branch 있고...
이렇게 생각하지말고, 하나만 딱 생각해서 돌아야 했음. 
어차피 재귀로 돌리면 모두 돌아갈 수 있었으니깐. 

*/
function solution(numbers, target) {
  let answer = 0;

  const DFS = (i, sum, numbers) => {
    if (i === numbers.length) {
      if (sum === target) {
        answer++;
      }
      return;
    }

    const num = numbers[i];
    DFS(i + 1, sum - num, numbers);
    DFS(i + 1, sum + num, numbers);
  };

  DFS(0, 0, numbers);

  console.log(answer);

  return answer;
}

solution([1, 1, 1, 1, 1], 3);
