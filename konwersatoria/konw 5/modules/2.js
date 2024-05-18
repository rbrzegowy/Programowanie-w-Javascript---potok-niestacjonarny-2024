// let filename = '2.js'; // 'name' has already been declared error - in console
filename = '2.js';
document.querySelector('#btn').addEventListener('click', () => saveTheWorld(filename))
function saveTheWorld(name) {
    console.log('saveTheWorld from 2.js, name:', name)
}