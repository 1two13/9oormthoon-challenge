//! 틀린 코드
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
  let [N, K] = input[0].split(' ').map(Number); // 과일 개수, 가진 돈
  let list = input.slice(1).map((el) => el.split(' ').map((el) => Number(el)));
  let answer = 0; // K로 구매할 수 있는 과일들의 최대 포만감 합

  // 포만감 높은 순으로 list 정렬
  list.sort((a, b) => b[1] - a[1]);
  // 조각 구매: P개의 조각으로 자른 뒤, 원하는 만큼만 구매 가능(모든 조각의 가격은 1, 포만감은 C/P)
  list.map((el) => list.push([1, el[1] / el[0]]));
  console.log(list);

  let i = 0;
  while (K > 0) {
    const [P, C] = list[i]; // [과일 가격, 포만감]
    if (K >= P) {
      answer += C;
      K -= P;
    }
    i++;

    console.log(C, answer);
  }

  console.log(answer);

  rl.close();
});

//! 다른 코드
//* 배열 안에 [조각 당 포만감 수치, 원래 가격] 값을 가지도록 설정
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
  let [N, K] = input[0].split(' ').map(Number); // 과일 개수, 가진 돈
  let list = input.slice(1).map((el) => el.split(' ').map((el) => Number(el)));
  let answer = 0; // K로 구매할 수 있는 과일들의 최대 포만감 합
  let cost = [];

  // 조각 구매: P개의 조각으로 자른 뒤, 원하는 만큼만 구매 가능(모든 조각의 가격은 1, 포만감은 C/P)
  list.map((el) => cost.push([el[1] / el[0], el[0]])); // [조각 당 포만감 수치, 원래 가격]
  cost.sort((a, b) => b[0] - a[0] || b[1] - a[1]);

  // 조각 당 포만감 수치가 가장 높은 과일부터 사기
  for (let i = 0; i < N; i++) {
    const [value, amount] = cost[i];
    //* 돈이 부족할 때만 조각 단위로 구매
    const buy = Math.min(amount, K);
    K -= buy;
    answer += value * buy;
  }

  console.log(answer);

  rl.close();
});
