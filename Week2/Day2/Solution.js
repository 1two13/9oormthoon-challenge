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
