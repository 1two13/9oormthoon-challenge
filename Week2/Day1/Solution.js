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
  // 3개의 부분 문자열을 만들어서 []에 push하고, 해당 배열을 arr에 push
  function getAllSubstrings(input) {
    const substrings = [];

    for (let i = 1; i < input.length - 1; i++) {
      for (let j = i + 1; j < input.length; j++) {
        substrings.push([input.slice(0, i), input.slice(i, j), input.slice(j)]);
      }
    }

    return substrings;
  }

  const combinations = getAllSubstrings(input[1]);
  let list = [];

  // list에 모든 값 push
  for (let i = 0; i < combinations.length; i++) {
    list.push(...combinations[i]);
  }

  // P: arr에서 중복 제거 후 모든 문자열 사전순으로 정렬
  let sortedList = [...new Set(list)].sort();
  let scoreArr = [];

  // arr을 순회하면서 각각의 배열 안에 있는 값의 인덱스를 모두 더하기
  for (let i = 0; i < combinations.length; i++) {
    let score = 0;

    for (let j = 0; j < 3; j++) {
      score += sortedList.indexOf(combinations[i][j]) + 1;
    }
    scoreArr.push(score);
  }

  // 문자열을 나눠서 얻을 수 있는 최대 점수
  console.log(Math.max(...scoreArr));

  rl.close();
});
