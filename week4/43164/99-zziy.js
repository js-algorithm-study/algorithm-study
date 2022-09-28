function solution(tickets) {
  let map = new Map();
  let path = [];
  const pathList = [];
  const check = Array.from({ length: tickets.length }, () => 0);

  tickets.forEach((ticket) => {
    const [departure, arrival] = ticket;
    if (map.has(departure))
      map.set(departure, [...map.get(departure), arrival]);
    else map.set(departure, [arrival]);
  });

  function dfs(departure) {
    if (check.every((c) => c === 1)) return pathList.push([...path]);
    if (map.has(departure)) {
      map.get(departure).forEach((arrival) => {
        for (let i = 0; i < tickets.length; i++) {
          const [d, a] = tickets[i];
          if (d === departure && a === arrival && check[i] === 0) {
            check[i] = 1;
            path.push(arrival);
            dfs(arrival);
            path.pop();
            check[i] = 0;
          }
        }
      });
    }
  }

  path.push("ICN");
  dfs("ICN");

  return pathList.sort()[0];
}

console.log(
  solution([
    ["ICN", "JFK"],
    ["HND", "IAD"],
    ["JFK", "HND"],
  ])
);
