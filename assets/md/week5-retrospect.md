# 5주 차 과제

## 계산기 앱 만들기 도전!

### 계산기 앱을 만들기로 도전한 이유

이번 과제는 다양한 과제 중에 원하는 것을 골라서 할 수 있었다. 마지막 과제이기도 하고 완성하지 못하더라도 도전적인 과제를 해보고 싶어서 계산기를 만드는 과제를 골랐다. 3주 차 과제를 시간 안에 완성하지는 못했지만, 과제를 하면서 정말 많이 배웠고, 결국 늦더라도 완성했을 때의 희열이 생각나서 이번에도 도전해 보고 싶었다. 시간 내에 해낼 수 있다면 정말 기쁠 것 같다. 할 수 있는 데까지 화이팅!!!

제공된 과제 파일에 마크업과 스타일링이 되어있어서 너무 기뻤다. 마크업에 시간이 가장 많이 드는 것 같다는 생각이 들 정도로 마크업을 좀 어려워하는 데 계산기 과제는 마크업과 스타일링을 하지 않아도 돼서 마음이 가벼웠다. 기능 구현에만 집중하면 되겠다!

### 첫 번째 문제! switch 문에 `break` 까먹지 말자!

우선, 처음 마크업을 봤을 때 온통 버튼이었다. 그렇다면! 모든 버튼에 이벤트를 하나씩 주는 것보다는 이벤트 위임을 사용하는 것이 좋지 않을까? 라는 생각으로 시작했다. 버튼에 클릭 이벤트가 잘 작동하는 것을 확인하고, 키를 종류별로 `switch` 문을 사용해서 구분해 봤다. 숫자 키를 눌렀는데 콘솔에 숫자, 소수점, 등호, 초기화 키가 눌렸다는 메시지가 모두 떴다. 당황해서 다른 키를 눌러도 마찬가지였다. 초기화 키를 빼고는 모두 여러 메시지가 한 번에 떴다. 문제가 없을 거로 생각했는데 발생하니까 당황스러웠다. 마음을 가라앉히고 다시 살펴보니 `break`를 까먹었다. 그래서 `case`에 따라 실행이 되더라도 다음 `case`까지 모두 돌면서 콘솔에 메시지를 출력한 것이다. `switch` 문에 `break` 키워드를 까먹지 말자!

### 두 번째 문제! `forEach()` 메서드에서 `break`?

```JavaScript
function removePressedClassname() {
  operatorKeys.forEach((key) => {
    if (key.classList.contains(PRESSED_CLASSNAME)) {
      key.classList.remove(PRESSED_CLASSNAME)
      break
    }
  })
}
```

연산자 키를 눌렀다가 다른 키를 눌렀을 때 `is-pressed` 클래스가 있다면 지우는 기능을 하는 함수를 만들려고 했다. `is-pressed` 클래스를 찾으면 굳이 나머지 키를 순회하지 않아도 돼서 `break`를 걸려고 했다. 키를 순회할 때 `forEach()` 메서드를 사용했는데 `Uncaught SyntaxError: Illegal break statement`라는 에러가 떴다. `forEach()` 메서드는 `break`를 지원하지 않는다. mdn 문서를 확인해 봤더니 `break`를 사용하려면 `forEach()` 메서드는 적합하지 않은 툴이라고 한다. `forEach()` 메서드 대신 `for...of` 문으로 수정했다.

### 세 번쩨 문제! 문자열을 숫자로 `parseInt()` & `parseFloat()`

너무 당연한 실수를 해버렸다. 연산자를 누르기 이전까지 입력한 숫자랑 이후 숫자를 연산할 때 입력 받은 숫자가 문자열이라는 사실을 까먹었다. 더하기를 해봤는데 문자열 더하기랑 결과가 같아서 신나게 웃어버렸다. 야무쌤이 여러 번 얘기하셨던 내용이라 다행히 보자마자 뭐가 문제인지 알아차렸다. 문자열을 숫자로 바꾸는 메서드 중에 정수가 아닌 실수를 사용하기 위해서는 `parseFloat()`을 사용해야 한다. 값이 문자값인지 숫자값인지 주의해야겠다! 꼭 문자나 숫자가 아니더라도 배열이나 객체, 혹은 유사 배열인지도 잘 구분해서 사용해야겠다.

### 예외적인 상황!

기본적인 기능은 이제 다 구현한 것 같다는 생각이 들어서 여러가지 테스트를 해봤다. 등호 키를 여러 번 눌렀을 때 보통 계산기를 사용하면 현제 보이는 값에 금방 했던 계산을 반복한다. 예를 들어 `1 + 2 =`을 누른 후 다시 `=`을 누르면 최종 값인 `3`에 `2`를 더하고, 다시 또 누르면 `5`에 `2`를 더하고, 이후에도 최종 값에 마지막 연산을 계속한다.

하지만 실제로 해보니 저장된 첫 번째 값에 결과 값만 계속 더했다. 제대로 작동하도록 하려면 결과 값을 첫 번째 값으로 게속 새로 저장하고 거기에 처음 저장된 두 번째 값을 더해야 한다. 두 번째 값을 임시로 저장해 놓으면 다시 등호를 눌렀을 때 사용할 수 있겠다.

### 최종 점검

마지막으로는 노션 문서를 한 번 훑어보면서 내가 놓친 부분은 없는지 확인했다. 나는 이전 선택한 버튼 종류랑 첫 번쨰 값이랑 연산자, 그리고 임시로 저장한 값을 `let` 변수로 선언했는데 노션에는 커스텀 속성으로 저장했다. 왜 변수가 아닌 커스텀 속성을 사용했는지 궁금해졌다.

생각보다 많은 예외 상황이 있었다. 노션 문서를 살펴보니 모든 상황을 테스트 코드를 사용해서 확인했다. 나는 하나하나 직접 입력해 보면서 확인했는데, 이렇게 테스트 코드를 사용하니까 코드를 수정할 때마다 다른 문제가 생기진 않았는지 일일이 확인하지 않아도 돼서 편리할 것 같다.

마지막에 모든 기능을 함수로 묶어서 리팩토링한 것이 가장 마음에 들었다. 코드를 수정하려면 하나씩 찾아다니고 위아래로 열심히 스크롤하거나 검색을 했는데 이렇게 다 묶어서 내려놓으니까 필요할 때 `ctrl + 클릭`하니까 너무 편하다!

### 느낀 점

계산기 과제를 하면서 그동안 배운 여러 기능을 사용해볼 수 있어서 좋았다. 자바스크립트의 마지막 과제라 좀 아쉽긴 하지만, 다음 주부터 프로젝트를 시작하면 이제까지 배운 모든 것과 배우지 않았지만 필요한 기능들을 또 새롭게 배우게 될 것이다. 걱정도 되지만 기대도 된다!

계산기가 제대로 작동하도록 만들기까지 여러 시행착오와 여러 예외 상황들을 살핀 것처럼 나가 개발자가 되기까지 여러 시행착오를 겪을 것이다. 하지만 그런 모든 상황이 나를 성장시킬 것을 믿는다. 문제에 부딛혀보고, 해결해 보면서 더 많이 성장할 것이다! 문제를 두려워하지 말고 오히려 즐겨보자! 화이팅!!!
