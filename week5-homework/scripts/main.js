;(() => {
  const PRESSED_CLASSNAME = 'is-pressed'

  const calculator = document.querySelector('.calculator')
  const calculatorDisplay = calculator.querySelector('.calculator__display')
  const calculatorKeys = calculator.querySelector('.calculator__keys')
  const allKeys = [...calculatorKeys.children]
  const operatorKeys = allKeys.filter((key) => key.dataset.buttonType === 'operator')
  const clearButton = allKeys.find((key) => key.dataset.buttonType === 'clear')
  
  let previousButtonType, firstValue, operator, tempValue

  // 버튼에 클릭 이벤트 위임
  calculatorKeys.addEventListener('click', (e) => {
    const button = e.target.closest('button')
    if (!button) return

    const { buttonType, key } = button.dataset
    // display 영역 표시 결과
    const displayValue = calculatorDisplay.textContent

    // 연산자 키에서 is-pressed 클래스 제거
    removePressedClassname()

    switch(buttonType) {
      // 연산자 키: +, -, *, /
      case 'operator': handleOperatorKeys(button); break
      // 숫자 키: 0~9
      case 'number': handleNumberKeys(button); break
      // 소수점 키: decimal
      case 'decimal': handleDecimalKey(); break
      // 초기화 키: AC
      case 'clear': handleClearKey(); break
      // 등호 키: = (result)
      case 'equal': handleEqualKey(); break
    }
    // 초기화 키나 등호 키가 아닌 키를 누르면 초기화 키의 textContent를 'CE'로 변환
    if (buttonType !== 'clear' && buttonType !== 'equal' && clearButton.textContent === 'AC') clearButton.textContent = 'CE'

    // 이전에 클릭한 버튼 종류 기억하기
    previousButtonType = buttonType
  })

  // 테스트 코드 ------------------------------------------------------------------------------------------------------
  {
    const test = [
      {
        message: '1 입력 결과',
        keys: ['1'],
        result: '1',
      },
      {
        message: '12 입력 결과',
        keys: ['1', '2'],
        result: '12',
      },
      {
        message: '3. 입력 결과',
        keys: ['3', 'decimal'],
        result: '3.',
      },
      {
        message: '덧셈 결과',
        keys: ['2', 'plus', '3', 'equal'],
        result: '5',
      },
      {
        message: '뺄셈 결과',
        keys: ['3', 'minus', '7', 'equal'],
        result: '-4',
      },
      {
        message: '곱셈 결과',
        keys: ['3', 'times', '8', 'equal'],
        result: '24',
      },
      {
        message: '나눗셈 결과',
        keys: ['5', 'divide', '1', '0', 'equal'],
        result: '0.5',
      },
      {
        message: '5= 입력 결과',
        keys: ['5', 'equal'],
        result: '5',
      },
      {
        message: '0. 입력 결과',
        keys: ['decimal'],
        result: '0.'
      },
      {
        message: '2.. 입력 결과',
        keys: ['2', 'decimal', 'decimal'],
        result: '2.'
      },
      {
        message: '2.5. 입력 결과',
        keys: ['2', 'decimal', '5', 'decimal', '5', 'decimal'],
        result: '2.55'
      },
      {
        message: '2.= 입력 결과',
        keys: ['2', 'decimal', 'equal'],
        result: '2'
      },
      {
        message: '= 먼저 입력 결과',
        keys: ['equal'],
        result: '0'
      },
      {
        message: '=3 입력 결과',
        keys: ['equal', '3'],
        result: '3'
      },
      {
        message: '5=3 입력 결과',
        keys: ['5', 'equal', '3'],
        result: '3'
      },
      {
        message: '=. 입력 결과',
        keys: ['equal', 'decimal'],
        result: '0.'
      },
      {
        message: '5=. 입력 결과',
        keys: ['5', 'equal', 'decimal'],
        result: '0.'
      },
      {
        message: '1+1=+1= 입력 결과',
        keys: ['1', 'plus', '1', 'equal', 'plus', '1', 'equal'],
        result: '3'
      },
      {
        message: '*. 입력 결과',
        keys: ['times', 'decimal'],
        result: '0.'
      },
      {
        message: '5*. 입력 결과',
        keys: ['5', 'times', 'decimal'],
        result: '0.'
      },
      {
        message: '7/= 입력 결과',
        keys: ['7', 'divide', 'equal'],
        result: '1'
      },
      {
        message: '9-5- 입력 결과',
        keys: ['9', 'minus', '5', 'minus'],
        result: '4'
      },
      {
        message: '9*- 입력 결과',
        keys: ['9', 'times', 'minus'],
        result: '9'
      },
      {
        message: '9-== 입력 결과',
        keys: ['9', 'minus', 'equal', 'equal'],
        result: '-9'
      },
      {
        message: '8-5== 입력 결과',
        keys: ['8', 'minus', '5', 'equal', 'equal'],
        result: '-2'
      },
      {
        message: '1+2+3+4+5+ 입력 결과',
        keys: ['1', 'plus', '2', 'plus', '3', 'plus', '4', 'plus', '5', 'plus'],
        result: '15'
      },
    ]
    
    test.forEach(runTest)

    testClearKey()

    function pressKey(key) {
      allKeys.find((k) => k.dataset.key === key).click()
    }

    function pressKeys(...keys) {
      keys.forEach((key) => pressKey(key))
    }

    function getDisplayValue() {
      return calculatorDisplay.textContent
    }

    function runTest({ message, keys, result }) {
      pressKeys(...keys)
      console.assert(getDisplayValue() === result, message)
      resetCalculator()
    }

    function testClearKey() {
      pressKeys('5', 'clear')
      console.assert(getDisplayValue() === '0', '계산 전: 디스플레이 초기화')
      console.assert(clearButton.textContent === 'AC', '계산 전: clear 버튼 AC 표시')
      resetCalculator()

      resetCalculator()
    }
  }

  /**
   * 연산자 키에 'is-pressed' 클래스가 있으면 제거하는 함수
   */
  function removePressedClassname() {
    for (const key of operatorKeys) {
      if (key.classList.contains(PRESSED_CLASSNAME)) {
        key.classList.remove(PRESSED_CLASSNAME)
        break
      }
    }
  }

  /**
   * 문자열로 저장된 숫자를 실수로 변환하여 연산자 종류에 따라 계산하는 함수
   * 
   * @param {String} operator 계산할 연산자
   * @param {Number} firstValue 계산할 첫 번째 값
   * @param {Number} secondValue 계산할 두 번째 값
   * @returns {Number} 최종 값 반환
   */
  function calculate(operator, firstValue, secondValue) {
    switch(operator) {
      case 'plus': return firstValue + secondValue
      case 'minus': return firstValue - secondValue
      case 'times': return firstValue * secondValue
      case 'divide': return firstValue / secondValue
    }
  }

  /**
   * 초기화 버튼을 두 번 눌러 계산기를 초기화하는 함수
   */
  function resetCalculator() {
    clearButton.click()
    clearButton.click()
  }

  function handleOperatorKeys(button) {
    const { key } = button.dataset
    const displayValue = calculatorDisplay.textContent

    // is-pressed 클래스 추가
    button.classList.add(PRESSED_CLASSNAME)

    if (previousButtonType !== 'operator' && previousButtonType !== 'equal' && typeof firstValue === 'number' && operator) {
      let calculatedResult = calculate(operator, firstValue, parseFloat(displayValue, 10))
      calculatorDisplay.textContent = calculatedResult
      firstValue = calculatedResult
    } else {
      calculatorDisplay.textContent = parseFloat(displayValue, 10) * 1
      // 이전까지 입력한 값 기억하기
      firstValue = parseFloat(displayValue, 10)
      tempValue = ''
    }

    // 어느 연산자 키를 눌렀는지 기억하기
    operator = key
  }

  function handleNumberKeys(button) {
    const { key } = button.dataset
    const displayValue = calculatorDisplay.textContent

    // result가 '0'이거나
    // 이전에 누른 버튼이 연산자 키였다면
    // 누른 숫자로 새로 표시
    if (displayValue === '0' || previousButtonType === 'operator') {
      calculatorDisplay.textContent = key
    }
    // result가 '0'이 아니면 누른 숫자를 뒤에 연결
    else {
      calculatorDisplay.textContent += key
    }
    if (previousButtonType === 'equal') {
      resetCalculator()
      calculatorDisplay.textContent = key
    }
  }

  function handleDecimalKey() {
    const displayValue = calculatorDisplay.textContent

    // 이전에 소수점을 찍지 않았으면 소수점을 뒤에 연결
    if (!calculatorDisplay.textContent.includes('.'))
      calculatorDisplay.textContent += '.'

    // 바로 전에 등호 키를 눌렀으면 '0.'으로 표시
    if (previousButtonType === 'equal') {
      resetCalculator()
      calculatorDisplay.textContent += '.'
    }
    if (previousButtonType === 'operator') {
      calculatorDisplay.textContent = '0.'
    }
  }

  function handleClearKey() {
    calculatorDisplay.textContent = '0'
    clearButton.textContent = 'AC'
    if (clearButton.textContent === 'AC') {
      firstValue = ''
      operator = ''
      tempValue = ''
    }
  }

  function handleEqualKey() {
    const displayValue = calculatorDisplay.textContent
    const secondValue = tempValue || parseFloat(displayValue, 10)

    // firstValue랑 operator가 있을 때만
    // 계산한 값을 화면에 표시
    if (typeof firstValue === 'number' && operator) {
      let calculatedResult = calculate(operator, firstValue, secondValue)
      calculatorDisplay.textContent = calculatedResult
      // 등호 키를 여러 번 누를 때를 위해
      // firstValue에 결과 값을 저장하고,
      firstValue = calculatedResult
      // secondValue를 임시 저장
      tempValue = secondValue
    } else {
      calculatorDisplay.textContent = secondValue * 1
    }
  }
})()