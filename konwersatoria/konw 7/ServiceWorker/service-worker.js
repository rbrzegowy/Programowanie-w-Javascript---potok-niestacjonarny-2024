document.addEventListener('DOMContentLoaded', appStart)

function appStart() {
    registerServiceWorker()
    watchNetworkStatus()
}
function registerServiceWorker() {
    // Zarejestruj ServiceWorker (zwraca Promise)
    navigator.serviceWorker
        .register('service-worker-thread.js')
        .then((registration) => {
            // reg.scope - zasięg działania SW
            console.log('[SW] Register', registration)
            registration.sync.register('event test: qwerty') //qwerty to event.tag
        })
        .catch((err) => console.log(err))
}
function watchNetworkStatus() {
    const statusContainer = document.querySelector('#net-status')
    setInterval(
        () => {
            const status = navigator.onLine ? '<span id="status-online">Online</span>' : '<span id="status-offline">Offline!</span>'
            statusContainer.innerHTML = 'Stan sieci: ' + status
        }
        , 1000)
}