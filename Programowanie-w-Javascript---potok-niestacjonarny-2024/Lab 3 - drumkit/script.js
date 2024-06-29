// Mapowanie klawiszy na pliki dźwiękowe
const keyToSound = {
    '65': 'clap.wav',   // klawisz 'A'
    '83': 'kick.wav',   // klawisz 'S'
    '68': 'hihat.wav',  // klawisz 'D'
    '70': 'tom.wav',    // klawisz 'F', przykładowy dźwięk
};

// Przechowywanie nagrań
const channels = [[], [], [], []]; // Załóżmy, że to są nasze kanały
let currentChannel = 0;
let isRecording = false;
let recordingStartTime;

// Inicjalizacja dźwięków
document.addEventListener('keydown', event => {
    const key = event.keyCode.toString();
    if (keyToSound[key]) {
        playSound(key);
        if (isRecording) {
            channels[currentChannel].push({
                sound: keyToSound[key],
                time: Date.now() - recordingStartTime
            });
        }
    }
});

function playSound(keyCode) {
    const soundFile = keyToSound[keyCode];
    if (!soundFile) return;
    const audio = new Audio(`./sounds/${soundFile}`);
    audio.play();
    const keyElement = document.querySelector(`div[data-key="${keyCode}"]`);
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 200);
}

function playAllChannels() {
    channels.forEach(channel => {
        channel.forEach(note => {
            setTimeout(() => {
                playSound(note.sound);
            }, note.time);
        });
    });
}

// Logika do rozpoczęcia nagrywania
function startRecording(channel) {
    isRecording = true;
    currentChannel = channel;
    channels[currentChannel] = [];
    recordingStartTime = Date.now();
}

// Przykładowe użycie:
// startRecording(0); // Rozpocznij nagrywanie na kanale 0

// Aby zainicjować interakcję z klawiszami myszy:
document.getElementById('keys').addEventListener('click', (event) => {
    const keyElement = event.target;
    const keyCode = keyElement.dataset.key;
    if (keyCode) {
        playSound(keyCode);
        if (isRecording) {
            channels[currentChannel].push({
                sound: keyToSound[keyCode],
                time: Date.now() - recordingStartTime
            });
        }
    }
});
