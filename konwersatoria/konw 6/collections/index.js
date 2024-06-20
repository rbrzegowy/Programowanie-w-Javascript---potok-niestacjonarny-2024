// Już poznane - [] i {}


// Map - zbiór par klucz-wartość. Główne cechy odróżniające Map od {}
// * kluczem może być praktycznie cokolwiek (np. boolean, inny obiekt, funkcja, symbol)
// * brak kluczy dla pustej mapy (vs prototype obiektu)
// * Map ma .size
// Map ma lepszą wydajność dla częstych zmian
// pełne porównanie Map do obiektu: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps

// ustawianie wartości: .set()
// pobieranie wartości. .get(), .entry, .keys, .values, .forEach, .groupBy()
// usuwanie: .delete(), .clear()
// sprawdzanie: .has()
// ilość elementów: .size
const rates = new Map()

// * klucze zawsze w kolejności dodania
// * kluczem może cokolwiek (np. liczba, string, inny obiekt, tablica, funkcja)

rates.set('Quake', 9)
rates.set('Tomb Raider', 10)
rates.set('World of Warcraft', 8)

// * dostęp do zawartości
console.log(`Total rates:  ${rates.size}`)
for ([game, rate] of rates) {
  console.log(`${game} has strong ${rate}`)
}
console.log(...rates)
// * Mapa jest wydajniejsza od obiektu (przy częstych dodaniach/usunięciach par klucz-wartość)
// * Mapa się nie serializuje:( (brakuje jej .toJSON()) - trzeba dodać argument replacer do JSON.stringify i reviver do JSON.parse()
const json = JSON.stringify(rates)
console.log(json) // {}

// Set
const whatever = new Set()
// * zbiór unikalnych wartości dowolnego typu
// porównanie czy wartość jest unikalna następuje z użyciem algorytmu SameValueZero (to samo co ===, z wyjątkiem NaN===NaN)
// * wartości są przechowywane w kolejności dodania
// * jest iterable (można iterować za pomocą pętli, użyć spread operator itd)
// * 
// dodawanie: .add()

whatever.add(1)
whatever.add(1) // nie doda, już jest
whatever.add('jeden')
whatever.add('jeden') // nie doda, już jest
const arr = [1, 2, 3]
whatever.add(arr)
whatever.add([1, 2])
whatever.add([1, 2])  // ref do innej (identycznej co do wartości) tablicy
whatever.add(() => { console.log('hello twice in set!') })
whatever.add(() => { console.log('hello twice in set!') }) // j/w
// sprawdzenie czy wartość istnieje
console.log('czy set ma "jeden"?', whatever.has('jeden'))
// pobranie wielkości set-a
console.log(`Whatever size: ${whatever.size}`)
// usuwanie - .delete, .clear
whatever.delete(1)
// iteracja
console.log(...whatever)
whatever.forEach(el => console.log('set el:', el))

// Set ma fajny zestaw metod do pracy na zbiorach - łączenie, część wspólna etc: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#set_composition
// .difference, .intersection, .union, .symmetricDifference, .isDisjointFrom, .isSubsetOf, .isSupersetOf


// WeakSet - kolekcja "garbage-collectable" elementów. W praktyce - kolekcja obiektów i niezarejestrowanych symboli
// WeakSet nie jest enumerowalny
// Metody: .add, .has, .delete

// WeakMap - klucze muszą być "garbage-collectable" (jak w WeakSet). Wartości mogą być dowolne, byle nie miały referencji do kluczy w WeakMap
// WeakMap nie jest enumerowalny

