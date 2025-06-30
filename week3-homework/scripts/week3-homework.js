{
  const carousel = document.querySelector('.carousel')
  const carouselWrapper = carousel.querySelector('.carousel-wrapper')
  const carouselContainer = carousel.querySelector('.carousel-container')
  const contents = carouselContainer.querySelectorAll('.carousel-content')

  const prevButton = carousel.querySelector('[aria-label^="이전"]')
  const nextButton = carousel.querySelector('[aria-label^="다음"]')

  const SELECTED_CLASSNAME = 'is-selected'
  let selectedFirstIndex = -1

  setButtonState()
  setTabindexControl()

  nextButton.addEventListener('click', () => {
    if (prevButton.getAttribute('disabled') === '') prevButton.removeAttribute('disabled')

    const selectedFirstContent = carouselContainer.querySelector('.' + SELECTED_CLASSNAME)

    for (let i = 0, l = contents.length; i < l; i++) {
      if (contents.item(i) === selectedFirstContent) {
        selectedFirstIndex = i
        break
      }
    }

    if (!contents.item(selectedFirstIndex + 4)) nextButton.setAttribute('disabled', '')
    
    const carouselWrapperRecInfo = carouselWrapper.getBoundingClientRect()
    const distance = (carouselWrapperRecInfo.width + 16) * ((selectedFirstIndex + 2) / 2)
    carouselContainer.style.setProperty('transform', 'translateX(-' + distance + 'px)')
    
    selectedFirstContent.classList.remove(SELECTED_CLASSNAME)
    selectedFirstContent.nextElementSibling.classList.remove(SELECTED_CLASSNAME)
    contents.item(selectedFirstIndex + 2).classList.add(SELECTED_CLASSNAME)
    contents.item(selectedFirstIndex + 3).classList.add(SELECTED_CLASSNAME)

    // const carouselIndicator = carousel.querySelector('carousel-indicator')
    const currentPage = document.querySelector('.current-page')
    currentPage.textContent = (selectedFirstIndex + 4) / 2


    setTabindexControl()
  })

  prevButton.addEventListener('click', () => {
    if (nextButton.getAttribute('disabled') === '') nextButton.removeAttribute('disabled')

    const selectedFirstContent = carouselContainer.querySelector('.' + SELECTED_CLASSNAME)

    for (let i = 0, l = contents.length; i < l; i++) {
      if (contents.item(i) === selectedFirstContent) {
        selectedFirstIndex = i
        break
      }
    }

    if (!contents.item(selectedFirstIndex - 3)) prevButton.setAttribute('disabled', '')
    
    const carouselWrapperRecInfo = carouselWrapper.getBoundingClientRect()
    const distance = (carouselWrapperRecInfo.width + 16) * ((selectedFirstIndex - 2) / 2)
    carouselContainer.style.setProperty('transform', 'translateX(-' + distance + 'px)')
    
    selectedFirstContent.classList.remove(SELECTED_CLASSNAME)
    selectedFirstContent.nextElementSibling.classList.remove(SELECTED_CLASSNAME)
    contents.item(selectedFirstIndex - 1).classList.add(SELECTED_CLASSNAME)
    contents.item(selectedFirstIndex - 2).classList.add(SELECTED_CLASSNAME)

    // const carouselIndicator = carousel.querySelector('carousel-indicator')
    const currentPage = document.querySelector('.current-page')
    currentPage.textContent = (selectedFirstIndex) / 2


    setTabindexControl()
  })

  function setButtonState() {
    let selectedFirstIndex = -1

    for (let i = 0, l = contents.length; i < l; i++) {
      if (contents.item(i).classList.contains(SELECTED_CLASSNAME)) {
        selectedFirstIndex = i
        break
      }
    }

    if (selectedFirstIndex === -1) {
      console.warn('어느 캐러셀 콘텐츠에도 활성 상태를 나타내는 클래스 이름이 없습니다.',)
    } else if (selectedFirstIndex === 0) {
      prevButton.setAttribute('disabled', '')
    } else if (selectedFirstIndex === contents.length - 2) {
      nextButton.setAttribute('disabled', '')
    }
  }

  function setTabindexControl() {
    contents.forEach((content) => {
      if (content.classList.contains(SELECTED_CLASSNAME)) {
        content.querySelector('a').removeAttribute('tabindex')
      } else {
        content.querySelector('a').setAttribute('tabindex', '-1')
      }
    })
  }
}
