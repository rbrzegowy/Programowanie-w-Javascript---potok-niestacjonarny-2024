// żeby tutaj móc zrobić import z innego js - a trzeba dać w <script> type = "module"

import { saveTheWorld } from './module.js'; // import wybranych elementów
// import {saveTheWorld as nothingImportant} from './module.js'; // import z aliasowaniem
import mod from './module.js'; // import elementu oznaczonego jako domyślny export w module.js
import * as mod from './module.js'; // import wszystkich elementów z module.js jako właściwości obiektu mod

// readonly import! const alike
console.log("mod name:", mod.name)
mod.name = 'ups'
console.log('From 3-with-module, mod.name:', mod.name)
console.log(mod)
mod.saveTheWorld();

// dynamiczny import
const x = await import('./module.js')