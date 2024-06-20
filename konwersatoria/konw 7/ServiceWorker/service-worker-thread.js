// lifecycle:
// 1. 'install' event
// 2. 'activate' event
// 3. idle - serviceWorker czeka na eventy

const cacheVersion = 'v3'
const cacheFilesArray = [
    'service-worker.html',
    'service-worker.js',
    'service-worker.css',
    'img/offline.png',
    'img/1.jpg',
    // 'img/2.jpg',
    'img/3.jpg',
    // 'img/4.jpg',
    'img/5.jpg',
    // 'img/6.jpg'
]

const cacheAllRequests = true

// pierwsza instalacja
self.addEventListener('install',
    (e) => {
        console.log('[SW] install event', e)
        // budujemy cache podczas instalacji service workera
        e.waitUntil(
            // CacheStorage
            caches.open(cacheVersion)
                .then(cache => {
                    console.log('%c [SW] CACHING FILES', 'background: red; color: #fff, padding: 10px');
                    cache.addAll(cacheFilesArray)
                })
        )
    })

// aktywowanie service workera
self.addEventListener('activate',
    (e) => {
        console.log('[SW] activate event', e)
        // sprawdzamy czy mamy aktualną wersję cache - wpis w caches.keys() (Promise)
        e.waitUntil(
            caches.keys()
                .then(ck => {
                    console.log('%c CACHE KEYS', 'background: red; color: #fff, padding: 10px', ck)
                })
        )

    })

// nasłuchiwanie na wiadomości
self.addEventListener('message',
    (e) => {
        console.log('[SW] messge event', e)
    })

// słuchamy na fetch
// fetch to zdarzenie generowane przy każdym requescie do serwera
self.addEventListener('fetch',
    e => {
        // console.log('[SW] fetch event.request', e.request)
        // tutaj następuje cache z użyciem Cache API
        e.respondWith(
            caches.match(e.request)
                .then((resp) => {
                    if (resp) {
                        console.log('[SW] request from cache', resp);
                        return resp
                    }
                    // e.request to stream, musimy go sklonować (stream "używa się" tylko raz)
                    const req = e.request.clone()
                    return fetchData(req)
                })
                .catch(function () {
                    return caches.match('./img/offline.png');
                })

        )
    })

self.addEventListener('sync',
    (e) => {
        console.log('[SW] sync event', e)
        // synchronizacja danych
        // e.waitUntil (jakasFunkcja())
    })

// push to powiadomienie z serwera
self.addEventListener('push',
    (e) => {
        console.log('[SW] push event', e)
        self.registration.showNotification('SWorker notify!')
    })

function fetchData(req) {
    return fetch(req)
        .then(resp => {
            console.log('RESP:', resp)
            // response to stream object
            let newResp = response.clone()
            return caches.open(cacheVersion)
        })
        .then((cache) => {
            if (resp.ok && cacheAllRequests) {
                cache.put(resp.url, newResp)
            }
            return resp
        })
}

