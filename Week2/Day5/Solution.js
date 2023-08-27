//! 다른 코드
//* 문제 해석을 잘못 했었음. 주어진 board판에 위치하면 작성된 distance와 direction에 따라 이동
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const directions = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

let N;
let goormPos, playerPos;
let goormVisited, playerVisited;
let board = [];

// 보드 밖을 나가면 반대쪽의 첫 번째 칸으로 이동
function set_Pos(a) {
  if (a === -1) return N - 1;
  if (a === N) return 0;
  return a;
}

// 게임 점수를 구하는 함수
function move(pos, visited, score, board) {
  let [x, y] = pos;
  visited[x][y] = true;
  let flag = true; // 게임 진행 여부

  while (flag) {
    let command = board[x][y];
    let distance = parseInt(command.slice(0, -1));
    let direction = command.slice(-1);

    for (let i = 0; i < distance; i++) {
      x += directions[direction][0];
      y += directions[direction][1];
      x = set_Pos(x);
      y = set_Pos(y);

      if (!visited[x][y]) {
        visited[x][y] = true;
        score += 1;
      }
      // 자신의 말이 이미 방문한 칸을 다시 지날 때 게임 종료
      else {
        flag = false;
        break;
      }
    }
  }

  return score;
}

let input = [];
rl.on('line', (line) => {
  input.push(line);
  N = Number(input[0]);
  if (input.length === N + 3) {
    rl.close();
  }
});

rl.on('close', () => {
  goormPos = input[1].split(' ').map((num) => Number(num) - 1);
  goormVisited = Array.from(Array(N), () => new Array(N).fill(false));
  playerPos = input[2].split(' ').map((num) => Number(num) - 1);
  playerVisited = Array.from(Array(N), () => new Array(N).fill(false));

  for (let i = 3; i < N + 3; i++) {
    board.push(input[i].split(' '));
  }

  let goormScore = move(goormPos, goormVisited, 1, board);
  let playerScore = move(playerPos, playerVisited, 1, board);

  if (goormScore > playerScore) console.log('goorm ' + goormScore);
  else if (goormScore < playerScore) console.log('player ' + playerScore);

  process.exit();
});
