document.addEventListener('DOMContentLoaded', () => {
    listen('#event-listener', (e) => onBtnClick(e))
    listen('#rekurencja', () => recurr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    listen('#kontekst', debugContext)
    listen('#xhr', getUrl)
    listen('#zmiana-dom', articleChange)
    listen('#dom-events', listenToWindowResize)
    listen('#long-task', longTask)
    listen('#toggle-loader', toggleLoader)
    listen('#fetch-luke', fetchLuke)
})

function listen(elem, cb, eventName = 'click') {
    document.querySelector(elem).addEventListener(eventName, cb)
}

// gdzie jest nemo...
function onBtnClick(e) {
    log(e)
    log('A gdzie na call stack jest .addEventListener?')
}

function log(data) {
    console.log(data)
}

// rekurencja, ewaluacja obiektów w konsoli
const recurr = function internal(arr) {
    console.log(arr)
    if (arr.length === 3) {
        debugger
    } else {
        arr.pop()
        internal(arr)
    }
}

// debug scope
function debugContext() {
    const someRandomNum = Math.random()
    console.log(this);
    debugger
}

// debug scope
function getUrl() {
    const url = "https://onet.pl"
    fetch(url).then(console.log)
}

// dom structure change - dom breakpoints
function articleChange() {
    document.querySelector('article').innerHTML = 'Article has changed'
}

//  dom events - only if event has listener(s)
//  ex: resize event - workflow.wsei.edu.pl
function listenToWindowResize() {
    window.addEventListener('resize', (e) => {
        console.log('resize', e)
    })
}

// performance
function longTask() {
    let num = 1e9
    while (num > 0) {
        const a = num * 5
        num--
    }
}

let animateLoader = false
function toggleLoader() {
    const loader = document.querySelector('#loader')
    let step = 1
    const maxWidth = 300
    animateLoader = !animateLoader
    anim()
    function anim() {
        const loaderWidth = loader.offsetWidth + step
        if (loaderWidth > maxWidth || loaderWidth === 0) {
            step *= -1
        }
        loader.style.width = loaderWidth + 'px'
        if (animateLoader) {
            requestAnimationFrame(anim)
        }
    }
}
async function fetchLuke() {
    const response = fetch('https://swapi.dev./api/people/1')
}