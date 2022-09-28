/* 
1) game_board와 table을 이중 for문으로 돌면서 game_board에서는 비어있는 0을, table에서는 채워있는 1을 찾음
찾았으면, 상하좌우를 비교해서 연결되어있는 것들을 BFS로 찾음. 찾았으면 찾은 것들을 array로 몰아 넣음. 다시 for문을 돌면서 여기에 포함되지 않을 것들을 다시 찾아서 넣음. 

2) 다 끝나면 해당 도형들을 정사각형 판 안에 둠. 비어 있는 부분들을 0으로 채우란 의미

3) game_board, table 모두 그렇게 했으면, 서로 비교. 이 때, 360도 회전까지 고려함. 
서로 비교해서 맞는 경우 return
*/

function solution(gameBoard, table) {
  print(gameBoard);
  print(table);

  let gameBoardPuzzles = [];
  let tablePuzzles = [];

  // 1)
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      if (gameBoard[i][j] === 0) {
        const puzzle = BFS([i, j], gameBoard, 0);
        gameBoardPuzzles.push(puzzle);
      }
    }
  }

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      if (table[i][j] === 1) {
        const puzzle = BFS([i, j], table, 1);
        tablePuzzles.push(puzzle);
      }
    }
  }

  console.log("game puzzles");
  console.log(gameBoardPuzzles);
  console.log("table puzzles");
  console.log(tablePuzzles);

  // 2)
  let gameBoardFrames = [];
  let tableFrames = [];

  gameBoardPuzzles.forEach((puzzle) => {
    gameBoardFrames.push(giveFrame(puzzle));
  });
  tablePuzzles.forEach((puzzle) => {
    tableFrames.push(giveFrame(puzzle));
  });

  console.log("game frames");
  console.log(gameBoardFrames);
  console.log("table frames");
  console.log(tableFrames);

  // 3)
  let cnt = 0;
  gameBoardFrames.forEach((frame) => {
    tableFrames.forEach((frame2) => {
      if (rotate(frame, frame2)) cnt++;
    });
  });

  console.log("cnt", cnt);
}

function rotate(puzzleA, puzzleB) {
  const puzzleALengthX = puzzleA.length;
  const puzzleALengthY = puzzleA[0].length;
  const puzzleBLengthX = puzzleB.length;
  const puzzleBLengthY = puzzleB[0].length;

  const compare = (puzzleA, puzzleB) => {
    let flag = true;
    console.log("puzzle A", puzzleA, "puzzle B", puzzleB);
    // for (let i = 0; puzzleA.length; i++) {
    //   // 문제.
    // 	for (let j = 0; puzzleA[i].length; j++) {
    //     if (puzzleA[i][j] !== puzzleB[i][j]) {
    //       flag = false;
    //       break;
    //     }
    //   }
    // }
    return flag;
  };

  // 1줄
  if (
    puzzleALengthX === 1 ||
    puzzleALengthY === 1 ||
    puzzleBLengthX === 1 ||
    puzzleBLengthY === 1
  ) {
    return compare(puzzleA, puzzleB);
  }

  // 아닌 경우
  // let flag = false;
  // // 1줄 x => puzzle B 회전 필요
  // for (let r = 0; r < 4; r++) {
  //   // 360도
  //   if ((r = 0)) {
  //     if (compare(puzzleA, puzzleB)) {
  //       flag = true;
  //       return flag;
  //     }
  //   }
  // }
}

/**
 * 2번 작업 : 퍼즐의 빈 부분 채워서 사각형 만들어주기
 * @param {array} puzzle
 * @returns
 */
function giveFrame(puzzle) {
  let minI = Infinity;
  let minJ = Infinity;
  let maxI = -1;
  let maxJ = -1;

  puzzle.forEach((p) => {
    let [i, j] = p;
    if (i < minI) {
      minI = i;
    }
    if (i > maxI) {
      maxI = i;
    }
    if (j < minJ) {
      minJ = j;
    }
    if (j > maxJ) {
      maxJ = j;
    }
  });

  let frame = [];

  for (let a = minI; a <= maxI; a++) {
    let row = [];
    for (let b = minJ; b <= maxJ; b++) {
      const exist = puzzle.some((ele) => ele[0] === a && ele[1] === b);
      if (exist) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    frame.push(row);
  }

  return frame;
}

/**
 * 1번 작업: BFS로 이어진 퍼즐 찾기
 * @param {array} node [i,j]
 * @param {array} array gameboard or table
 * @param {number} target 0 or 1
 * @returns
 */
function BFS(node, array, target) {
  let visit = [];
  let answer = [];

  visit.push(node);

  while (visit.length > 0) {
    // @ts-ignore
    let [i, j] = visit.shift();
    array[i][j] = target === 0 ? 1 : 0; // 지나온 곳 다시 돌아가지 않게

    const exist = answer.some((ele) => ele[0] === i && ele[1] === j);
    if (!exist) {
      answer.push([i, j]);
    }

    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach((direction) => {
      let [x, y] = direction;

      if (
        i + x < 0 ||
        i + x >= array.length ||
        j + y < 0 ||
        j + y >= array.length
      )
        return false;

      if (array[i + x][j + y] === target) {
        visit.push([i + x, j + y]);
      }
    });
  }

  return answer;
}

function print(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  console.log("---");
}

solution(
  [
    [1, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 0, 1],
    [1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0],
  ],
  [
    [1, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 1],
    [0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0],
  ]
);
