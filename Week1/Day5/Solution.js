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
  const [n, k] = input[0].split(' ').map(Number);
  const arr = input[1].split(' ').map(Number);
  const newArr = [];
  const regex = /1/g;

  for (let i = 0; i < n; i++) {
    // 1. 10진수를 2진수로 변경
    const str = arr[i].toString(2);
    // 2. 2진수에 포함된 1의 개수 확인
    const matches = str.match(regex);

    newArr.push([arr[i], matches.length]);
  }

  newArr.sort((a, b) => b[1] - a[1] || b[0] - a[0]);
  console.log(newArr[k - 1][0]);

  rl.close();
});

//! 다른 코드
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
  const [N, K] = input[0].split(' ').map(Number);
  // [정수, 1의 개수]
  const arr = input[1]
    .split(' ')
    .map((e) => [Number(e), [...Number(e).toString(2)].filter((c) => c === '1').length]);

  //* 1의 개수 기준으로 내림차순 정렬, 10진수 기준으로 내림차순 정렬
  arr.sort((a, b) => b[1] - a[1] || b[0] - a[0]);

  console.log(arr[K - 1][0]);
  process.exit();
});
