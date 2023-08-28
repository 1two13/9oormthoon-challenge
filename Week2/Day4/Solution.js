const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

rl.on('line', (line) => {
  input.push(line);
});

rl.on('close', () => {
  let n = Number(input[0].split(' ')[0]);
  let result = Array.from({ length: n }, () => Array(n).fill(0));
  const board = input.slice(1, n + 1).map((el) => el.split(' '));
  const indexList = input.slice(n + 1).map((el) => el.split(' ').map((el) => Number(el) - 1));

  for (let i = 0; i < indexList.length; i++) {
    // indexList 순회
    let [x, y] = indexList[i];

    // 본인 좌표
    if (board[x][y] === '0') result[x][y] += 1;
    else if (board[x][y] === '@') result[x][y] += 2;

    // 좌표 기준으로 상하좌우로 폭탄이 터짐 => result에 기록
    for (let j = 0; j < 4; j++) {
      let newX = x + dx[j];
      let newY = y + dy[j];

      // board 범위 안에 있고,
      if (newX >= 0 && newY >= 0 && newX < n && newY < n && board[newX][newY] !== '#') {
        if (board[newX][newY] === '@') result[newX][newY] += 2;
        else result[newX][newY] += 1;
      }
    }
  }

  console.log(Math.max(...result.flat()));

  rl.close();
});

//! 다른 코드
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let N, K;
let matrix = [];
let dx = [0, -1, 1, 0, 0]; // 원래 위치와 상하좌우
let dy = [0, 0, 0, -1, 1];

rl.on('line', (line) => {
  if (input.length === 0) {
    input.push(line);
    [N, K] = input[0].split(' ').map(Number);
  } else {
    input.push(line.trim());
  }
  if (input.length === N + K + 1) {
    rl.close();
  }
});

rl.on('close', () => {
  let score = Array.from({ length: N }, () => Array(N).fill(0));
  for (let i = 1; i <= N; i++) {
    matrix.push(input[i].trim().split(' '));
  }

  // 떨어지는 폭탄의 위치를 [x, y]에 할당
  for (let i = N + 1; i <= N + K; i++) {
    let [x, y] = input[i].trim().split(' ').map(Number);
    x -= 1;
    y -= 1;

    for (let j = 0; j < 5; j++) {
      let nx = x + dx[j];
      let ny = y + dy[j];

      if (nx >= 0 && nx < N && ny >= 0 && ny < N && matrix[nx][ny] !== '#') {
        if (matrix[nx][ny] === '@') score[nx][ny] += 2;
        else score[nx][ny] += 1;
      }
    }
  }

  console.log(Math.max(...score.flat()));

  process.exit();
});
