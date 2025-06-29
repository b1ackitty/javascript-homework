{
  const carousel = document.querySelector(".carousel")
  const contentWrapper = carousel.querySelector(".carousel-container")
  const contents = contentWrapper.querySelectorAll(".carousel-content")

  const prevButton = carousel.querySelector('[aria-label^="이전"]')
  const nextButton = carousel.querySelector('[aria-label^="다음"]')

  const SELECTED_CLASSNAME = 'is-selected'

  nextButton.addEventListener('click', () => {
    const selectedFirstContent = contentWrapper.querySelector('.' + SELECTED_CLASSNAME)

    let selectedFirstIndex = -1
    for (let i = 0, l = contents.length; i < l; i++) {
      if (contents.item(i) === selectedFirstContent) {
        selectedFirstIndex = i
        break
      }
    }

    const firstFirstContentRecInfo = contents.item(selectedFirstIndex).getBoundingClientRect()
    const nextFirstContentRecInfo = contents.item(selectedFirstIndex + 2).getBoundingClientRect()
    const distance = nextFirstContentRecInfo.x - firstFirstContentRecInfo.x
    contentWrapper.style.setProperty('transform', 'translateX(-' + distance + 'px)')
    // console.log(distance)
  })

  prevButton.addEventListener('click', () => {
    const selectedFirstContent = contentWrapper.querySelector('.' + SELECTED_CLASSNAME)

    let selectedFirstIndex = -1
    for (let i = 0, l = contents.length; i < l; i++) {
      if (contents.item(i) === selectedFirstContent) {
        selectedFirstIndex = i
        break
      }
    }

    const firstFirstContentRecInfo = contents.item(selectedFirstIndex).getBoundingClientRect()
    const prevFirstContentRecInfo = contents.item(selectedFirstIndex - 2).getBoundingClientRect()
    const distance = firstFirstContentRecInfo.x - prevFirstContentRecInfo.x
    contentWrapper.style.setProperty('transform', 'translateX(-' + distance + 'px)')
    // console.log(distance)
  })
}
