let map = new Map();

function combination(order, course) {
  let arr = [];

  function dfs(v, k) {
    if (v === course) {
      const menu = [...arr].join("");
      if (map.get(menu)) {
        map.set(menu, map.get(menu) + 1);
      } else {
        map.set(menu, 1);
      }
    } else {
      for (let i = k; i < order.length; i++) {
        arr[v] = order[i];
        dfs(v + 1, i + 1);
      }
    }
  }

  dfs(0, 0);
}

function solution(orders, courses) {
  var answer = [];

  courses.forEach((course) => {
    orders.forEach((order) => {
      combination(order.split("").sort(), course);
    });

    let max = 0;
    map.forEach((value) => {
      if (value > max) {
        max = value;
      }
    });
    map.forEach((value, key) => {
      if (value === max && value >= 2) answer.push(key);
    });
    map.clear();
  });

  return answer.sort();
}

console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]));
