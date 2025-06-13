// --------------------------------------------
// 변수, 상수 작성 과제
// --------------------------------------------

// 각 항목에 대해 변수나 상수를 선언하고, 알맞은 값을 할당하세요.

// 1. 사용자 이름을 저장할 변수를 선언하고 "자신의 이름"을 할당하세요.
let userName = '정지은'

// 2. "절대 영도(온도의 최저 한계)인 -273.15°C"를 담을 상수를 선언하세요.
const ABSOLUTE_ZERO = -273.15

// 3. "로그인 여부"를 확인하는 불리언 타입 변수을 선언하고 적절한값을 할당하세요.
let isLoggedIn = true

// 4. "사용자 나이" 변수를 선언하고 숫자 값을 할당하세요.
let userAge = 31

// 5. "상품 가격(예: 39,900원)"을 담는 변수를 작성하세요.
let price = 39_900

// 6. 웹 페이지의 "배경색"을 담는 상수를 작성하고 적절한 값을 할당하세요.
const BACKGROUND_COLOR = '#333333'

// 7. 사용자가 작성한 "댓글 수(예: 12)"를 담는 변수를 선언하고 값을 할당하세요.
let commentCount = 12

// 8. "현재 페이지 번호(예: 3)"를 담는 변수를 작성하고 적절한 값을 할당하세요.
let currentPage = 3

// 9. "회원 등급('VIP', '골드', '실버' 중 하나)"을 담는 변수를 작성해보세요.
let memberTier = 'VIP'

// 10. "버튼이 클릭되었는지 여부"를 담는 변수를 선언하고 불리언 타입 값을 설정하세요.
let isButtonClicked = false

// --------------------------------------------
// 함수 작성 과제
// --------------------------------------------

// 1. 인사말 메시지
function greetUser(username) {
  return '안녕하세요! ' + username + '님. 좋은 하루되세요!'
}
console.log(greetUser('정지은'))

// 2. 원가 계산
const TAX_RATE = 0.033
const calculateOriginalPrice = function(priceWithTax) {
  return priceWithTax / (1+ TAX_RATE)
}
console.log(calculateOriginalPrice(1033))

// 3. 주류 판매 가능 여부
const registrationCard = {
  name: '정지은',
  age: 31,
  gender: 'female',
}
const canSellAlcohol = (registrationCard) => registrationCard >= 19
console.log(canSellAlcohol(registrationCard.age))

// 4. 할인가 계산
function getDiscountedPrice(originalPrice, discountPercent) {
  return originalPrice - (originalPrice * discountPercent)
}
console.log(getDiscountedPrice(18_700, 0.2))

// 5. 등급 판단
function rateGrade(score) {
  if (score >= 90 && score <= 100) {
    return {
      score: score,
      grade: 'A',
      description: '매우 우수'
    }
  } else if (score >= 80 && score < 90) {
    return {
      score: score,
      grade: 'B',
      description: '우수'
    }
  } else if (score >= 70 && score < 80) {
    return {
      score: score,
      grade: 'C',
      description: '보통'
    }
  } else if (score >= 60 && score < 70) {
    return {
      score: score,
      grade: 'D',
      description: '미달, 통과 기준 근접'
    }
  } else if (score >= 0 && score < 60) {
    return {
      score: score,
      grade: 'F',
      description: '낙제'
    }
  } else {
    return '올바른 점수 값이 아닙니다.'
  }
}
console.log(rateGrade(96))
console.log(rateGrade(84))
console.log(rateGrade(77))
console.log(rateGrade(62))
console.log(rateGrade(15))
console.log(rateGrade(-19))
console.log(rateGrade(125))
