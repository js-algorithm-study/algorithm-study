/* 
각 노드들을 순회. 
해당 노드가 이미 어딘가에 연결이 되어 있다면?? 굳이 체크할 필요가 없다.
누군가와의 연결 true/ false 나타낸 배열 생성.
해당 배열에서 false라면 DFS를 돌려서 연결상태를 추가해주고, answer++
*/

function solution(n, computers) {
  let answer = 0;

  // 각 컴퓨터들의 연결 상태. true이면 어딘가에 연결이 되어있다는 뜻.
  const connections = new Array(n).fill(false);

  // 스택으로 구현한 DFS. vistied라는 stack이 비어이지 않은 한 계속 돈다.
  const DFS = (computer) => {
    let visited = [computer];

    while (visited.length > 0) {
      // 시작 노드. connection true로
      const start = visited.pop();
      connections[start] = true;

      for (let end = 0; end < n; end++) {
        // connection이 false이고 이어져있는 노드를 방문해서 push.
        if (!connections[end] && computers[start][end]) {
          visited.push(end);
        }
      }
    }
  };

  for (let computer = 0; computer < n; computer++) {
    // 아직 연결이 안되어 있는 노드들만 체크할 예정
    if (!connections[computer]) {
      DFS(computer);
      answer++;
    }
  }

  console.log("answer", answer);

  return answer;
}

solution(3, [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1],
]);

solution(3, [
  [1, 1, 0],
  [1, 1, 1],
  [0, 1, 1],
]);
