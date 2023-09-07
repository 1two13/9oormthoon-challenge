//! 다른 코드
//* 그래프
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
});

rl.on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const visited = new Array(N + 1).fill(false);
  const graph = {};
  const result = [];
  let density = 0;

  // 양방향 그래프 생성
  for (let i = 1; i <= M; i++) {
    const [s, e] = input[i].split(' ').map(Number);

    if (!graph[s]) graph[s] = [];
    if (!graph[e]) graph[e] = [];

    graph[s].push(e);
    graph[e].push(s);
  }

  // 그래프 탐색으로 필요한 정보 얻기
  //! 구현하고 싶었지만 구현하지 못했던 부분
  for (let i = 1; i <= N; i++) {
    // 방문한 적 없을 때
    if (!visited[i]) {
      const q = [i];
      const component = new Set();

      while (q.length > 0) {
        const now = q.pop();

        if (!visited[now]) {
          // 방문했음 표시
          visited[now] = true;
          // 컴포넌트에 추가
          component.add(now);
          // 범위 오류 방지 위해, 존재하는 노드인지 확인
          for (const to of graph[now] || []) {
            // 방문하지 않았을 때(양방향 간선이기 때문에 하나만 확인해도 되서) q에 push
            if (!visited[to]) q.push(to);
          }
        }
      }

      let edge = 0; // 간선 수
      for (const j of component) {
        // 범위 오류 방지 위해, 간선이 존재하는 노드인지 확인
        for (const to of graph[j] || []) {
          if (component.has(to)) edge += 1; //* set을 사용해서 component를 생성했기 때문에 간선 존재 여부 확인할 때 상수 시간만큼만 소요
        }
      }

      const tempDensity = edge / component.size / 2; // 밀도 = 컴포넌트에 포함된 통신 회선 개수 / 컴퓨터 수(양방향으로 구해서 2로 나눠줌)
      // set 함수를 배열로 생성
      if (tempDensity > density) {
        // result 초기화
        result.length = 0;
        Array.prototype.push.apply(result, Array.from(component)); //* 첫 번째 인자에 두 번째 인자에서 생성한 배열의 요소를 모두 push
        density = tempDensity;
      }
    }
  }

  // 가장 밀도가 높은 컴포넌트의 번호들(오름차순, 공백)
  result.sort((a, b) => a - b);
  console.log(result.join(' '));
});
