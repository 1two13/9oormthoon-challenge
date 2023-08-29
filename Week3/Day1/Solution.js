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

//! 다른 코드
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let N, A, B;

rl.on('line', (line) => {
  input.push(line);
  if (input.length === 2) {
    rl.close();
  }
});

rl.on('close', (close) => {
  N = Number(input[0]);
  const [A, B] = input[1].split(' ').map(Number);
  // DP[i]는 통증수치가 i일 때, 통증 수치를 0으로 만들기 위해 필요한 아이템의 최소 개수
  let DP = Array(N + 1).fill(Infinity);
  DP[0] = 0;

  for (let i = 0; i <= N; i++) {
    if (i - A >= 0) {
      DP[i] = Math.min(DP[i], DP[i - A] + 1);
    }
    if (i - B >= 0) {
      DP[i] = Math.min(DP[i], DP[i - B] + 1);
    }
  }

  console.log(DP[N] !== Infinity ? DP[N] : -1);
  rl.close();
});
