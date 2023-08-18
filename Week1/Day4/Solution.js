// 완벽한 햄버거: 가장 큰 숫자를 기준으로 위랑 아래로 갈수록 숫자가 같거나 작아야함

// 출력값: 입력값을 모두 더한 값
// 완벽하지 않은 출력값: return 0

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
  const arr = input[1].split(' ').map(Number);
  const max = Math.max(...arr);
  const maxIndex = arr.indexOf(max);
  const before = arr.slice(0, maxIndex);
  const after = arr.slice(maxIndex + 1);
  let flag = true;

  for (let i = 0; i < before.length - 1; i++) {
    if (before[i] > before[i + 1]) {
      flag = false;
      break;
    }
  }

  // flag가 true일 때만 after 값 비교
  if (flag) {
    for (let i = 0; i < after.length - 1; i++) {
      if (after[i] < after[i + 1]) {
        flag = false;
        break;
      }
    }
  }

  if (flag) console.log(arr.reduce((a, b) => a + b));
  else console.log('0');

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
  const arr = input[1].split(' ').map(Number);
  const max = Math.max(...arr);
  let prev = 0;
  let isIncrease = true;
  let result = 0;

  for (const item of arr) {
    if ((isIncrease && item < prev) || (!isIncrease && item > prev)) {
      result = 0;
      break;
    }
    result += item;
    prev = item;

    if (item === max) isIncrease = false;
  }

  console.log(result);

  rl.close();
});

//! 다른 코드
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
  if (input.length === 2) rl.close();
});

function is_Equal(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

rl.on('close', () => {
  let arr = input[1].split(' ').map(Number);
  let chk = arr.indexOf(Math.max(...arr));
  let left = arr.slice(0, chk);
  let right = arr.slice(chk);

  left.sort((a, b) => a - b);
  right.sort((a, b) => b - a);

  let sortedArr = [...left, ...right];

  if (is_Equal(sortedArr, arr)) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    console.log(sum);
  } else console.log(0);

  process.exit();
});
