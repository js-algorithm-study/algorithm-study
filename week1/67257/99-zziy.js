function permutation() {
  let answer = [];
  let arr = [];
  let check = [];
  let operator = ["+", "-", "*"];
  function dfs(v) {
    if (v === 3) answer.push([...arr]);
    else {
      for (let i = 0; i < 3; i++) {
        if (!check[i]) {
          arr[v] = operator[i];
          check[i] = 1;
          dfs(v + 1);
          check[i] = 0;
        }
      }
    }
  }
  dfs(0);
  return answer;
}

function solution(expression) {
  var answer = [];
  let arr = permutation();
  let exp = [];
  let num = "";

  expression.split("").forEach((e, idx) => {
    if (e === "+" || e === "-" || e === "*") {
      exp.push(num);
      exp.push(e);
      num = "";
    } else {
      num += e;
    }
    if (idx === expression.split("").length - 1) {
      exp.push(num);
    }
  });

  arr.forEach((operators) => {
    const expTemp = [...exp];
    operators.forEach((operator) => {
      while (expTemp.includes(operator)) {
        if (operator === "+") {
          if (expTemp.includes("+")) {
            let idx = expTemp.indexOf("+");
            let num1 = expTemp[idx - 1];
            let num2 = expTemp[idx + 1];
            expTemp.splice(idx - 1, 3, Number(num1) + Number(num2));
          }
        }
        if (operator === "*") {
          if (expTemp.includes("*")) {
            let idx = expTemp.indexOf("*");
            let num1 = expTemp[idx - 1];
            let num2 = expTemp[idx + 1];
            expTemp.splice(idx - 1, 3, Number(num1) * Number(num2));
          }
        }
        if (operator === "-") {
          if (expTemp.includes("-")) {
            let idx = expTemp.indexOf("-");
            let num1 = expTemp[idx - 1];
            let num2 = expTemp[idx + 1];
            expTemp.splice(idx - 1, 3, Number(num1) - Number(num2));
          }
        }
      }
    });

    answer.push(Math.abs(expTemp));
  });

  return Math.max(...answer);
}

console.log(solution("100-200*300-500+20"));
