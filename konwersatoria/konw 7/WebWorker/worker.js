
// 1. nie ma dostępnych: window, document, parent, struktury DOM 
// 2. zamknięcie workera z wewnątrz: self.close()
// 3. na worker wskazuje obiekt self===this)
// 4. importowanie zewnętrznych skryptów: importScript('script.js') 
//     - ścieżka jest relatywna do ścieżki workera!
// 5. workery mogą tworzyć swoje własne 'subworkery' - np. do dzielenia dużych zadań

console.log('Worker context:', { ' this': this, navigator })

watchMessages()
counter()


function counter() {
    const hash = (Math.random() * 10000).toFixed()
    let i = 0
    setInterval(() => {
        i++
        // this.i = i
        postMessage(hash + '-' + i)
    }, 100)
}

function watchMessages() {
    addEventListener('message', function (e) {
        postMessage('Typed: ' + e.data)
    })
}