// https://www.kirupa.com/html5/web_animations_animate_method.htm
// API: https://developer.mozilla.org/en-US/docs/Web/API/Animation

const box = document.querySelector('#box2')
const pauseBtn = document.querySelector('#pause-animation')
pauseBtn.addEventListener('click', (ev) => {
  if (animation.playState === "running") {
    animation.pause()
    ev.target.textContent = "play anim"
  } else {
    animation.play()
    ev.target.textContent = "pause anim"
  }
})

const someYDestination = Math.floor(Math.random() * 200)

// 1. Cała animacja opisana znanym css-owym keyframes 
// 2. Cała animacja opisana w jednym miejscu
// 3. Można wcześniej dynamicznie wygenerować animację dla elementu
// 4. Można jej ponownie użyć na kolejnych elementach
// 5. Można do każdej z właściwości dodać wyliczone wartości:)
// 6. Można zareagować na stan animacji (eventy)

const boxAnimation = [
  {
    transform: 'translate(0, 0)'
  },
  // {
  //   // transform: 'translate(0, 200px)',
  //   transform: `translate(0, ${someYDestination}px)`,
  //   offset: 0.8 // 80% na timeline animacji
  // },
  {
    transform: 'translate(0, 400px)'
  }
]
// alternatywny sposób zapisu animacji
// const boxAnimation = {
//     transform: ['translate(0, 0)','translate(0, 400px)'],
//     opacity: [0,1]
//   },

const boxAnimationOptions = {
  duration: 2000,
  iterations: 2, //number
  direction: 'alternate', //alternate, reverse
  easing: 'ease-in-out',
  // fill: 'forwards'
}
const animation = box.animate(boxAnimation, boxAnimationOptions)

// 6. animation ma zdarzenia!
// cancel, finish, remove
animation.addEventListener('paused', onAnimationEvent)
animation.addEventListener('finish', onAnimationEvent)
console.log(animation)

//7. animation ma metody:) .play, .cancel, .finish, .pause, .reverse

function onAnimationEvent(event) {
  document.querySelector('#message').innerHTML = `[Animation event][${event.type}]`
  console.log(event)
}