/*
단품메뉴 -> 코스요리 (최소 두 개 이상의 단품, 최소 두 명 이상의 손님들로 부터 주문된 조합)

각 2개, 3개 등에서 가장 많이 뽑힌 메뉴가 있으면 그것만 넣고, 같은 횟수가 있으면 다 넣어줌

ex) AB 4, BC 3 이면 AB만 ABC 2, BCD 2이면 둘다 넣어주기

*/

function solution(orders, course) {
  const result = [];

  course.forEach((num) => {
    const courseResult = [];
    orders.forEach((order) => {
      const orderArr = order.split("");
      const combination = getCombination(orderArr, num);
      const joined = combination.map((ele) => ele.sort().join(""));
      courseResult.push(...joined);
    });
    result.push(courseResult);
  });

  //console.log(result);

  const counterResult = [];
  result.forEach((menus) => {
    const counter = {};
    menus.forEach((menu) => {
      counter[menu] = (counter[menu] || 0) + 1;
    });
    counterResult.push(counter);
  });

  //console.log(counterResult);

  const unsortedAnswer = [];

  counterResult.forEach((menus, index) => {
    let courseAnswer = [];
    let count = 0;

    for (let menu in menus) {
      if (counterResult[index][menu] >= 2) {
        if (count === counterResult[index][menu]) {
          courseAnswer.push(menu);
        }
        if (count < counterResult[index][menu]) {
          count = counterResult[index][menu];
          courseAnswer.length = 0; //clear
          courseAnswer.push(menu);
        }
      }
    }

    unsortedAnswer.push(...courseAnswer);
  });

  const answer = unsortedAnswer.sort();

  //console.log(answer);

  return answer;
}

/**
 * 배열에서 가능한 조합의 경우의 수를 리턴해주는 함수
 * @param {array} array 음식리스트 array
 * @param {number} select 몇개를 고를지 select 갯수
 * @returns 가능한 음식 조합
 */

function getCombination(array, select) {
  const result = [];

  if (select === 1) {
    return array.map((ele) => [ele]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);

    const combination = getCombination(rest, select - 1);

    result.push(...combination.map((ele) => [fixed, ...ele]));
  });

  return result;
}

// solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2, 3, 4]); // ["AC", "ACDE", "BCFG", "CDE"]
// solution(["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"], [2, 3, 5]); // 	["ACD", "AD", "ADE", "CD", "XYZ"]
solution(["XYZ", "XWY", "WXA"], [2, 3, 4]); //	["WX", "XY"]
