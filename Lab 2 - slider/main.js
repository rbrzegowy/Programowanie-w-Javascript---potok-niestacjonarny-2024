const box = document.querySelector('.box')

// setTimeout(() => {
//   box.style.transform = 'translateX(200px)'
// }, 2_000)
let position = 0
const anim = () => {
  box.style.transform = `translateX(${position}px)`
  position++
  setTimeout(anim, 16)
}
// const animInterval = setInterval(anim, 16)

anim()

// setTimeout(() => {
//   clearInterval(animInterval)
// }, 2_000)