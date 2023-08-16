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
  let [N, start] = input;
  let [T, M] = start.split(' ');
  N = Number(N);
  T = Number(T);
  M = Number(M);

  for (let i = 2; i < 2 + N; i++) {
    M += Number(input[i]);

    T += Math.floor(M / 60);
    M = M % 60;

    if (T >= 24) T -= 24;
  }

  console.log(T + ' ' + M);

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
  // 마지막으로 입력된 데이터에 줄바꿈이 없다면 마지막 데이터가 들어오지 않기 때문에(해당 문제에서는 해당되지 않음)
  // 확실하게 하기 위해 조건식 설정
  if (input.length === Number(input[0]) + 2) {
    rl.close();
  }
});

rl.on('close', () => {
  let N = Number(input[0]);
  let [currentHour, currentMinute] = input[1].split(' ').map(Number);

  for (let i = 0; i < N; i++) {
    let costMinute = Number(input[i + 2]);
    let tempMinute = currentMinute + costMinute;
    let resultMinute = tempMinute % 60;
    let resultHour = (currentHour + Math.floor(tempMinute / 60)) % 24;

    currentHour = resultHour;
    currentMinute = resultMinute;
  }

  console.log(currentHour, currentMinute);
});
