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
