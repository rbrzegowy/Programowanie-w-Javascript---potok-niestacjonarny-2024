let counter = 0
let lastTime = Date.now()
window.addEventListener('deviceorientation', onDeviceMove)

function onDeviceMove(event) {
    console.log(event)
}

function animate() {
    counter++
    if (counter % 100 === 0) {
        const time = Date.now()
        const interval = time - lastTime
        console.log(`Render 100 klatek trwał: ${interval} [${1000 / (interval / 100)}fps]`)
        lastTime = time
    }
    requestAnimationFrame(animate)
}

requestAnimationFrame(animate)