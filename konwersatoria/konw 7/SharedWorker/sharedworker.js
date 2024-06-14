let port
const clients = []

self.onconnect = (e) => {
    const port = e.ports[0]
    clients.push(port)
    port.onmessage = function (e) {
        port.postMessage(`Typed: ${e.data}, current this.i = ${this.i}`)
        if (e.data === 'terminate') {
            debugger
            close()
        }
    }
    port.start()
}

licznik()
function licznik() {
    const hash = (Math.random() * 10000).toFixed()
    let i = 0
    setInterval(() => {
        i++
        postMessageToAll('from shared: ' + hash + '-' + i)
    }, 1000)
}

function postMessageToAll(message) {
    for (const client of clients) {
        client.postMessage(message + ", clients connected: " + clients.length)
    }
}