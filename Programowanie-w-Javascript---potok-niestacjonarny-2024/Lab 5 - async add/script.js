const { performance } = require('perf_hooks');
// Asynchroniczna funkcja dodawania dwóch liczb
const asyncAdd = async (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!');
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 100);
    });
};

// Funkcja dodająca dowolną ilość argumentów
const sumAsyncNumbers = async (...args) => {
    let result = args[0];
    for (let i = 1; i < args.length; i++) {
        result = await asyncAdd(result, args[i]);
    }
    return result;
};

// Funkcja mierząca czas wykonania
const measureTime = async (operation) => {
    const start = performance.now();
    const result = await operation();
    const end = performance.now();
    console.log(`Wynik: ${result}, Czas wykonania: ${end - start} ms`);
};

// Testowanie funkcji dla 100 elementów
const testPerformance = async () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    await measureTime(() => sumAsyncNumbers(...numbers));
};

// Optymalizacja czasu wykonania
const sumAsyncNumbersOptimized = async (...args) => {
    if (args.length === 1) return args[0];
    const promises = [];
    for (let i = 0; i < args.length; i += 2) {
        if (i + 1 < args.length) {
            promises.push(asyncAdd(args[i], args[i + 1]));
        } else {
            promises.push(args[i]);
        }
    }
    const results = await Promise.all(promises);
    return sumAsyncNumbersOptimized(...results);
};

const testPerformanceOptimized = async () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    await measureTime(() => sumAsyncNumbersOptimized(...numbers));
};

// Uruchomienie testów wydajności
testPerformance();
testPerformanceOptimized();
