/*
짝 지어있는 두 글자를 골라서 없애준다. 

solution 2. 재귀적으로 쭉 훑으면서 regex에 맞는 글자를 찾아주는 방식. 하지만 이렇게하면 런타임에러가 난다.. 

solution 1. stack으로 생각해서, 자기 뒤의 string과 다르다면, pop해서 별도 보관. 만약 같다면, 두개 제거하고, 별도 보관 중이던 string들 다시 합치기. 반복해서 더 이상 안 될 때까지 반복.  

=> 잘못 생각했던 점. 
별도 보관 중이었던 것을 다시 합칠 이유가 없었음. 어차피 거기에 두어도 다시 for문 돌리면서 만나는 애랑 같으면 pop시켜서 사라질 것임. arr도 굳이 빼고 할 필요가 없이 그대로 두고 비교하면 됨.
*/

function solution(s) {
  let answer = 0;

  let arr = s.split("");

  let store = [];

  store.push(arr[0]);

  for (let i = 1; i < arr.length; i++) {
    if (store[store.length - 1] === arr[i]) {
      store.pop();
    } else {
      store.push(arr[i]);
    }
  }

  answer = store.length > 0 ? 0 : 1;

  // console.log(answer);

  return answer;
}

solution("baabaa");
solution("cdcd");

// --- 재귀 방식으로 풀면 런타임 에러가 난다고 함. 위의 방식으로도 풀리기는 함.

function solution2(s) {
  let answer = 0;

  // s가 홀수 개이면,
  if (s.length % 2 === 1) {
    return answer;
  }

  // 홀수 개수 string 있으면 미리 종료
  const count = {};
  s.split("").forEach((ele) => {
    count[ele] ? count[ele]++ : (count[ele] = 1);
  });

  for (let c in count) {
    if (count[c] % 2 === 1) {
      return answer;
    }
  }

  // 재귀로 확인
  const result = check(s);

  if (result === "") {
    answer = 1;
  }

  return answer;
}

// 재귀 함수
function check(s) {
  const regex = /([a-z])\1/;
  const result = s.replace(regex, "");

  if (result === "") {
    return result;
  }

  if (s === result) {
    return result;
  }

  return check(result);
}
