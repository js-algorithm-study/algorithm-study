/* 
4개가 되면 지워짐

길이 n개인 문자열, m개의 배열 (m x n)
*/

function solution(m, n, board) {
  let answer = 0;

  while (hasBlocks(m, n, board)) {
    let blocks = [];

    // board에 block이 있으면 모으기.
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        const check = checkBlocks(i, j, board);
        check && blocks.push(...check);
      }
    }

    // obj로 정리
    const obj = {};

    blocks.forEach((block) => {
      const [x, y] = block;
      if (obj[x]) {
        if (!obj[x].includes(y)) {
          obj[x].push(y); // 중복은 필요 없음
          answer++;
        }
      } else {
        obj[x] = [y];
        answer++;
      }
    });

    // x,y축을 뒤바꿈. inverse
    let inversedBoard = inverse(m, n, board); // y -> x

    // 빼줄 녀석 0으로 변경
    for (let block of Object.entries(obj)) {
      const [x, yArr] = block;
      yArr.forEach((y) => {
        const line = inversedBoard[y].split("");
        line[x] = "0";
        inversedBoard[y] = line.join("");
      });
    }

    // 0을 문자열 앞으로 이동. x,y축이 바뀌기 대문에 앞쪽에 있어야 위로 올라간다.
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (inversedBoard[i][j] === "0") {
          let line = inversedBoard[i].split("");
          line = ["0", ...line.slice(0, j), ...line.slice(j + 1)];
          inversedBoard[i] = line.join("");
        }
      }
    }

    // 다시 역으로 돌려서 return
    const newBoard = inverse(n, m, inversedBoard);

    board = newBoard;
  }

  console.log(answer);
  return answer;
}

function hasBlocks(m, n, board) {
  let hasB = false;

  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      const check = checkBlocks(i, j, board);
      if (check) hasB = true;
    }
  }

  return hasB;
}

/**
 *
 * @param {number} m
 * @param {number} n
 * @param {array} board
 */
function print(m, n, board) {
  for (let i = 0; i < m; i++) {
    console.log(board[i]);
  }
}

/**
 *
 * @param {number} i
 * @param {number} j
 * @param {array} board
 * @returns
 */
function checkBlocks(i, j, board) {
  const me = board[i][j];
  const right = board[i][j + 1];
  const under = board[i + 1][j];
  const diagonal = board[i + 1][j + 1];
  if (me !== "0" && me === right && me === under && me === diagonal) {
    return [
      [i, j],
      [i + 1, j],
      [i, j + 1],
      [i + 1, j + 1],
    ];
  } else {
    return false;
  }
}

function inverse(m, n, board) {
  let newBoard = [];

  for (let x = 0; x < n; x++) {
    let line = "";
    for (let y = 0; y < m; y++) {
      line += board[y][x];
    }
    newBoard.push(line);
  }

  return newBoard;
}

// solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]);

// solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"]);

solution(4, 5, ["AAAAA", "AUUUA", "AUUAA", "AAAAA"]);
