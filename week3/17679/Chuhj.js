function solution(m, n, board) {
  // 세로는 m - 1까지 가로는 n - 1까지 탐색
  // 2x2를 만족하면 시작 좌표를 저장
  board = board.map((row) => row.split(''));

  let answer = 0;

  while (true) {
    const blocks = [];

    for (let y = 0; y < m - 1; y++) {
      for (let x = 0; x < n - 1; x++) {
        const block = board[y][x];
        if (block === 0) continue;
        if (block === board[y][x + 1] && block === board[y + 1][x] && block === board[y + 1][x + 1]) {
          // 2 x 2를 만족하는지 확인
          blocks.push([y, x]);
        }
      }
    }

    // 지워진 블록을 0으로 교체
    blocks.forEach(([y, x]) => {
      board[y][x] = 0;
      board[y][x + 1] = 0;
      board[y + 1][x] = 0;
      board[y + 1][x + 1] = 0;
    });

    // 블록을 모두 내려줌
    // 밑에서 부터 순회
    for (let y = m - 1; y > 0; y--) {
      for (let x = 0; x < n; x++) {
        if (board[y][x] !== 0) continue;
        // 위쪽의 블록을 내려줌
        for (let up = y; up >= 0; up--) {
          if (board[up][x] !== 0) {
            [board[up][x], board[y][x]] = [board[y][x], board[up][x]];
            break;
          }
        }
      }
    }

    if (blocks.length === 0) break;
  }

  for (const row of board) {
    for (const block of row) {
      // 0의 개수를 셈
      if (block === 0) answer += 1;
    }
  }
  return answer;
}

console.log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']));
console.log(solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']));
