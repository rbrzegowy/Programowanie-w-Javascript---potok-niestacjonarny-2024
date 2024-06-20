const klucz1 = Symbol('klucz')
const klucz2 = Symbol('klucz')
klucz1.description // klucz

if (klucz1 === klucz2) {
  // nope, won't happen
}

// dla części dostęp do [klucz1] będzie dostępny (bo mają symbol klucz1),
// dla reszty zadziała jak prywatna właściwość
const jakisObiekcik = {
  [klucz1]: 10,
  [klucz2]() {
    console.log('tu też nie będize łatwo:)')
  }
}


// tworzenie globalnych symboli
Symbol.for('clean')

// odczytywanie wcześniej utworzonych globali:
const cleanSymbol = Symbol.for('clean')

const customDisposableObject = {
  // ...  
  [Symbol.for('clean')]() {
    // do some clean
  }
}

///////////////////////////////
// niektóre globalne symbole:
//////////////////////////////
// definiowanie iterable objects (np. dla for...of):
Symbol.iterator
Symbol.asyncIterator
// a wiesz jak "oszukać" operator instanceOf? :)
Symbol.hasInstance
// disposable objects
Symbol.dispose
Symbol.asyncDispose
// txt
Symbol.search
Symbol.match
Symbol.replace