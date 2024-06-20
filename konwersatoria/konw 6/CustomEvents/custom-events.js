// ----------------------------
// Custom events
// ----------------------------
// Case: chcemy emitować własne eventy
// Rozwiązania:
// 1. extends EventTarget i CustomEvents
// 2. Własny mechanizm (np. metoda .listen(event, cb))
// 3. Zewn. bliblioteka (np. RxJS)

// ---------------------------------------
// Co wiemy: 
// ---------------------------------------
// btn.addEventListener('click', () => {
//   console.log('btn!')
// })


// Rozwiązania:

// -------------------------------------------------------
// EventTarget - interface/klasa zaimplementowana w przeglądarkach i w Node.js
// -------------------------------------------------------
// chcemy poinformować świat że notatka zostaje usunięta
class Note extends EventTarget {
  constructor(title, content) {
    super()
    this.title = title
    this.content = content
    this.id = Note.createId()
    this.emitRemoveNoteAfter5s()
    this.removeEvent = new CustomEvent('remove', {
      // bubbles: true, // czy pozwalamy na bubbling (dla elementów html-owych emitujących custom events)
      detail: { title: this.title, content: this.content, id: this.id }
    })

  }
  emitRemoveNoteAfter5s() {
    setInterval(() => {
      console.log('[Note] dispatch Remove')
      this.dispatchEvent(this.removeEvent)
    }, 5000)
  }
  static createId() {
    return crypto.randomUUID()
  }
}

const note = new Note('notatka 1', 'test custom events')
note.addEventListener('remove', (e) => console.log(e))


// -------------------------------------------------------
// Uruchamianie zdarzeń spoza obiektu
// -------------------------------------------------------
// const removeEvent = new CustomEvent('remove', {
//   bubbles: true, // czy pozwalamy na bubbling (dla elementów html-owych emitujących custom events)
//   detail: { id: 10 }
// })

// document.querySelector('main').addEventListener('remove', console.log)
// btn.dispatchEvent(removeEvent)



// -------------------------------------------------------
// Własna implementacja eventów - początek w każdym bądź razie;)
// -------------------------------------------------------
// class Note {
//   #eventCallbacks = new Map()
//   #title
//   #content
//   #id
//   constructor(title, content) {
//     this.#title = title
//     this.#content = content
//     this.#id = Note.createId()
//     this.#emitRemoveNoteAfter5s()

//   }
//   #emitRemoveNoteAfter5s() {
//     setInterval(() => {
//       this.#dispatchEvent(
//         'remove',
//         { title: this.#title, content: this.#content, id: this.#id })
//     }, 5000)
//   }
//   #dispatchEvent(eventName, data) {
//     console.log('[Note] dispatch', eventName)
//     const callbacks = this.#getCallbacks(eventName)
//     for (const cb of callbacks) {
//       cb(data)
//     }
//   }
//   #getCallbacks(eventName) {
//     return this.#eventCallbacks.get(eventName) ?? []
//   }
//   listen(eventName, cb) {
//     const callbacks = this.#getCallbacks()
//     callbacks.push(cb)
//     this.#eventCallbacks.set(eventName, callbacks)
//   }
//   static createId() {
//     return crypto.randomUUID()
//   }
// }


// const note = new Note('notatka 1', 'test custom events')
// note.listen('remove', (e) => console.log(e))
// więcej przykładów eventow: https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events


// -------------------------------------------------------
// Usuwanie event listenerow - dla obiektów z EventTarget
// -------------------------------------------------------
// note.addEventListener('remove', someRemoveEventCb)
// note.removeEventListener('remove', someRemoveEventCb)

// ------------------------------
// AbortController
// ------------------------------
// const controller = new AbortController();

// note.addEventListener('remove', (e) => {
//   console.log()
// }, { signal: controller.signal });

// // somehow, somewhere, over the rainbow
// controller.abort()

// inny przykład - anulowanie fetch-a
// const cancelGet = new AbortController()
// let data
// fetch(someUrl, cancelGet.signal).then(d => data = d.json()).catch(console.log)
// setTimeout(() => {
//   if (!d) {
//     cancelGet.abort()
//   }
// }, 10_000)
