let name = 'module.js';
function saveTheWorld() {
    document.querySelector('#btn').addEventListener('click', () => console.log(name))
}

const a = 1
// export wybranego elementu(-ów)
// export const a = 1

// domyślny export
// export default name;
export default { saveTheWorld, name };
// import mod from .., next mod.saveTheWorld

// // import mod from .., next mod.stw
export { a, name, saveTheWorld } // yet another way to export
// import * as mod from './modules/module.js';

// export z aliasami
// export { a as b, name, saveTheWorld as stw }

// import('./module.js').then(data => {
//     console.log(data);
// })