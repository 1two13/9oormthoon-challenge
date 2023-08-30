// 1은 집
// 집이나 상하좌우에 발전기를 설치해야함

//* 접근 방향은 맞았는데 코드로 구현을 못했다.

//! 다른 코드
// 스택, BFS(큐로 구현)
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
  const N = Number(input[0]);
  const matrix = input.slice(1).map((el) => el.split(' ').map(Number));
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let visited = Array.from({ length: N }, () => Array(N).fill(false)); // 전기가 공급되고 있는 집
  let count = 0;
  let q;

  // 1. 첫 번째로 1인 값 찾기(전기 공급할 첫 번째 집)
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (matrix[i][j] === 1 && !visited[i][j]) {
        count++;
        q = [];
        q.push([i, j]);

        // 3. 탐색 후보가 모두 없어질 때까지 탐색 반복
        while (q.length > 0) {
          // 현재 탐색 후보 꺼내고
          let [currentR, currentC] = q.pop();
          // visited 변수 갱신
          visited[currentR][currentC] = true;
          // 현재 탐색 위치에서 상하좌우 탐색
          for (let k = 0; k < 4; k++) {
            let nextR = currentR + dx[k];
            let nextC = currentC + dy[k];
            if (nextR >= 0 && nextR < N && nextC >= 0 && nextC < N) {
              // 2. 해당 위치를 기준으로, 상하좌우에 1이 있으면 탐색 후보에 추가
              if (matrix[nextR][nextC] === 1 && !visited[nextR][nextC]) {
                q.push([nextR, nextC]);
              }
            }
          }
        }
      }
    }
  }

  console.log(count);

  rl.close();
});
