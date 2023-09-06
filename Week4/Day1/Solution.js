//! 재도전 코드
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
  const [N, M] = input[0].split(' ').map(Number);
  const toFromArr = input.slice(1).map((el) => el.split(' ').map(Number));
  let check = Array.from(Array(N + 1), () => Array(N + 1).fill(false)); // 간선 여부를 나타내는 배열
  let visited = Array(N + 1).fill(0); // 방문 여부 확인하는 배열
  let obj = {};
  let count = 1;

  for (let i = 0; i < toFromArr.length; i++) {
    const [to, from] = toFromArr[i];

    if (!obj[to]) obj[to] = [];
    obj[to].push(from);
    check[to][from] = true;
  }

  for (let i = 1; i <= N; i++) {
    // 아직 방문하지 않았고,
    if (visited[i] === 0) {
      let q = [i];
      // 큐에 값이 없을 때까지 반복
      while (q.length > 0) {
        const currentNode = q.shift();
        // 방문했음을 표시
        visited[currentNode] = count;
        //* || [] 왜 하는거지? => 하지 않으면 runtime 에러 발생
        for (const nextNode of obj[currentNode] || []) {
          // 양방향 간선인지 확인 && 방문여부 확인
          if (check[nextNode][currentNode] && visited[nextNode] === 0) {
            // 조건에 만족한다면 다음 탐색 후보에 추가
            q.push(nextNode);
          }
        }
      }
      // 모든 연결된 노드 방문 후, 하나의 컴포넌트 완성되었으므로 count++
      count++;
    }
  }

  console.log(count - 1);

  rl.close();
});

//! 다른 코드
//* BFS(모든 섬 방문해야하기 때문)

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let visited; // 연합의 개수 세기 위한 visited 변수 사용
let count = 1;
let graph = {}; // 그래프 선언

let input = [];
rl.on('line', (line) => {
  input.push(line.split(' ').map(Number));
  if (input.length === input[0][1] + 1) {
    rl.close();
  }
});

rl.on('close', () => {
  const [N, M] = input[0];
  const check = Array.from(Array(N + 1), () => Array(N + 1).fill(false)); //* 간선의 존재 여부 확인을 위한 인접 행렬
  visited = Array(N + 1).fill(0); //* 섬의 방문 여부, 어떤 연합에 속해있는지 확인 가능

  // 1. 그래프 입력(인접 리스트 방식, 객체)
  for (let i = 1; i <= M; i++) {
    let [s, e] = input[i];
    if (!graph[s]) graph[s] = [];
    graph[s].push(e);
    // 간선 연결되어 있음을 나타내기 위해 true로 변경
    check[s][e] = true;
  }

  for (let i = 1; i <= N; i++) {
    //* 2. visited 탐색 해 연결된 컴포넌수 개수 세기
    // 아직 어떤 연합에도 속해있지 않을 때, 즉 방문하지 않은 노드일 때
    if (visited[i] === 0) {
      let q = [i];
      while (q.length > 0) {
        //* BFS로 구현했기 때문에, shift()로 후보의 앞에서부터 탐색
        const currentNode = q.shift();
        // 몇 번째 연합인지 값 갱신
        visited[currentNode] = count;
        if (!graph[currentNode]) continue;
        for (const nextNode of graph[currentNode] || []) {
          if (graph[nextNode]) {
            //* 3. 조건대로 탐색하기(방문하지 않은 노드 && 돌아오는 간선이 있는 노드 동시에 확인)
            // 간선의 존재 여부를 O(1) 시간 안에 탐색할 수 있다.
            if (check[nextNode][currentNode] && visited[nextNode] === 0) {
              // 조건에 만족한다면 다음 탐색 후보에 추가
              q.push(nextNode);
            }
          }
        }
      }
      // 모든 연결된 노드 방문 후, 하나의 컴포넌트 완성되었으므로 count++
      count++;
    }
  }

  console.log(count - 1);
});
