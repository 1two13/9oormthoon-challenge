//* 그리디 알고리즘
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const arr = [14, 7, 1];
  let answer = 0;

  for await (const line of rl) {
    let input = Number(line);

    while (input > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (input >= arr[i]) {
          answer++;
          input -= arr[i];
          break;
        }
      }
    }

    rl.close();
  }

  // 통증 수치를 0으로 줄이기 위해 필요한 아이템 최소 개수, 단 0보다 작아지는 아이템은 사용할 수 없다.
  console.log(answer);

  process.exit();
})();

//! 다른 코드
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
rl.on('line', (line) => {
  input = Number(line);
});

rl.on('close', () => {
  let N = input;
  let ans = 0;

  for (let i of [14, 7, 1]) {
    ans += Math.floor(N / i);
    N %= i;
  }

  console.log(ans);
  process.exit();
});
