//* 엄청 비효율적으로 푼 것 같아서 익일 답안 확인 예정
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];

rl.on('line', (line) => {
  input.push(line);
});

rl.on('close', () => {
  const [N, K] = input[0].split(' ').map(Number); // 게임판 크기, 찾고 싶은 깃발 값
  const list = input.slice(1).map((el) => el.split(' ').map(Number));
  let countList = [];

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let count = 0;
      // (r, c)이 0인 경우
      if (list[r][c] === 0) {
        // 아래 3가지 케이스 중에서 1이 있을 때마다 count++
        // 1. (r - 1, c - 1) (r - 1, c) (r - 1, c + 1)
        if (r > 0 && c > 0 && list[r - 1][c - 1] === 1) count++;
        if (r > 0 && list[r - 1][c] === 1) count++;
        if (r > 0 && c + 1 < N && list[r - 1][c + 1] === 1) count++;
        // 2. (r, c - 1) _ (r, c + 1)
        if (c > 0 && list[r][c - 1] === 1) count++;
        if (c + 1 < N && list[r][c + 1] === 1) count++;
        // 3. (r + 1, c - 1) (r + 1, c) (r + 1, c + 1)
        if (r + 1 < N && c > 0 && list[r + 1][c - 1] === 1) count++;
        if (r + 1 < N && list[r + 1][c] === 1) count++;
        if (r + 1 < N && c + 1 < N && list[r + 1][c + 1] === 1) count++;
      }
      // 최종적으로 count된 값을 (r, c)에 작성
      countList.push(count);
    }
  }

  // 값이 K인 깃발 갯수
  console.log(countList.filter((el) => el === K).length);
  rl.close();
});

//! 다른 코드
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dx = [0, 0, 1, 1, 1, -1, -1, -1];
let dy = [1, -1, 1, 0, -1, 1, 0, -1];
let input = [];
let matrix = [];
let N, M;
let answer = 0;

rl.on('line', (line) => {
  input.push(line.trim());
  if (input.length === N + 1) {
    rl.close();
  }
});

rl.on('close', () => {
  [N, M] = input[0].split(' ').map(Number);

  for (let i = 1; i <= N; i++) {
    matrix.push(input[i].split(' ').map(Number));
  }

  // matrix[i][j] 값이 0이라면 주변의 1의 개수를 탐색
  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      // 주변의 구름 개수를 셀 goormCount
      let goormCount = 0;
      if (matrix[x][y] === 0) {
        // 8방향 dx/dy 기법
        for (let i = 0; i < 8; i++) {
          let nx = x + dx[i];
          let ny = y + dy[i];
          // 범위 오류를 검토
          if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
            // 탐색할 값이 1이라면, goormCount + 1
            if (matrix[nx][ny] === 1) goormCount++;
          }
        }
        // 만약에 주변의 구름의 개수가 K개라면 answer + 1
        if (goormCount === M) answer++;
      }
    }
  }
  console.log(answer);
});
