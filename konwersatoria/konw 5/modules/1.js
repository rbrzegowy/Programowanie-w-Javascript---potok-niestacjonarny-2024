let filename = '1.js';
document.querySelector('#btn').addEventListener('click', () => saveTheWorld(filename))
function saveTheWorld(name) {
    console.log('saveTheWorld from 1.js, name:', name)
}