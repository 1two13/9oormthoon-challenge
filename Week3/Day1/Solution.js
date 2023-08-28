//! 다른 코드
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let N;
let items;

rl.on('line', (line) => {
  input.push(line);
  N = input[0];
  items = [input[1]];
});

rl.on('close', () => {
  items = items[0].split(' ').map(Number);
  items.sort((a, b) => b - a);

  let answer = -1;

  //* for문 아이디어
  for (let i = parseInt(N / items[0]); i >= 0; --i) {
    const rest = N - items[0] * i;

    if (rest % items[1] === 0) {
      answer = i + rest / items[1];
      break;
    }
  }

  // 필요한 아이템 최소 개수
  // 0으로 만들 수 없는 경우에는 -1
  console.log(answer);

  rl.close();
});
