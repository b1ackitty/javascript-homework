/* global gsap, GSDevTools */

;(() => {
  const tl = gsap.timeline({
    id: 'contents animation',
    defaults: {
      opacity: 0,
      ease: 'back.out',
    },
  })

  tl
    .from('.contents__wrapper h2', { y: 30, })
    .from('.contents__title :first-child', { x: 80, duration: 1, }, '-=0.2')
    .from('.contents__title :last-child', { x: -80, duration: 1, }, '<')
    .from('.contents__description', { y:30, duration: 0.8 }, '-=0.5')
    .from('.contents__link-filled', { ease: 'linear', duration: 0.5 }, '-=0.4')
    .from('.contents__link', { ease: 'linear', duration: 0.5 }, '<')

  const graphicTl = gsap.timeline({
    id: 'graphic animation',
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true,
    defaults: {
      ease: 'back.out(1.5)',
      opacity: 0,
      duration: 1.3,
    },
  })

  graphicTl
    .from('#vLine2', { y: 1000, }, )
    .from('#hLine1', { x: 1000, }, '<')
    .from('#vLine1', { y: -1000, }, '-=1')
    .from('#hLine3', { x: 1000, }, '<')
    .from('#vLine3', { y: -1000, }, '-=0.8')
    .from('#hLine2', { x: -1000, }, '<')
    .from('#qCircleOrange', { rotation: 360, transformOrigin: 'right bottom', }, '-=0.6')
    .from('#qCircleBrown', { rotation: 360, transformOrigin: 'right top', }, '<')
    .from('#hCircleOrange', { ease: 'power4.out', x: 100, rotation: 360, transformOrigin: 'right center' }, '-=0.9')
    .from('#hCircleYellow', { ease: 'power4.out', x: 100, rotation: 360, transformOrigin: 'right center' }, '-=1')
    .from('#openHCircleRed', { rotation: 180, transformOrigin: 'center top' }, '-=1')
    .from('#circleRedCenter', { scale: 0.7, transformOrigin: 'center' }, 1)
    .from('#qCircleBlackBottom', { ease: 'power4.out', rotation: -180, transformOrigin: 'right top', }, '-=1')
    .from('#qCircleBeige', { ease: 'power4.out', rotation: -180, transformOrigin: 'right top', }, '-=1.1')
    .from('#qCircleBlackTop', { rotation: 90, transformOrigin: 'left bottom' }, '-=1')
    .from('#circleRed', { ease: 'bounce.out', y: -200, }, '-=0.8')
    .from('#openCircleOrange', { rotation: 360, transformOrigin: 'center', x: 300, }, '<')
    .from('#hCircleInEllipseRed', { x: -100 }, '-=1.1')
    .from('#openCircleRed', { scale: 0, transformOrigin: 'center', }, '-=0.9')
    .from('#circleYellow', { scaleX: 0, transformOrigin: 'center', duration: 0.75, }, '<')
    .from('#openEllipseRed', { ease: 'power4.out', scaleY: 0.5, y: -50, }, '-=0.8')
    .from('#hCircleInEllipseWhite', { x: -100, }, '-=1.1')
    .from('#openCircleLineRed', { scale: 1.5, transformOrigin: 'center' }, '-=0.9')

  // gsap.registerPlugin(GSDevTools)
  // GSDevTools.create({ animation: tl, loop: true, id: 'main' })
})()