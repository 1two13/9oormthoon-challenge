// 나눗셈 나머지는 버리기

const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let answer = 0;

rl.on('line', (line) => {
  input.push(line.trim());
  if (input.length === Number(input[0]) + 2) {
    rl.close();
  }
});

rl.on('close', () => {
  let T = Number(input[0]);

  for (let i = 1; i <= T; i++) {
    let [start, sign, end] = input[i].split(' ');
    start = Number(start);
    end = Number(end);

    if (sign === '+') {
      answer += start + end;
    } else if (sign === '-') {
      answer += start - end;
    } else if (sign === '*') {
      answer += start * end;
    } else if (sign === '/') {
      answer += Math.floor(start / end);
    }
  }

  // 계산 결과 모두 더하기
  console.log(answer);
});
