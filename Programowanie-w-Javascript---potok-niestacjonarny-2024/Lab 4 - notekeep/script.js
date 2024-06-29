document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const createdAt = new Date().toISOString();

    const note = { title, content, color, pin, createdAt };
    saveNote(note);
    displayNotes();
    event.target.reset(); // Resetuje formularz
});

function saveNote(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const container = document.getElementById('notesContainer');
    container.innerHTML = ''; // Wyczyszczenie obecnej tabeli przed dodaniem notatek
    notes.forEach(note => {
        const row = container.insertRow();
        row.insertCell(0).textContent = note.title;
        row.insertCell(1).textContent = note.content;
        row.insertCell(2).innerHTML = `<span style="display:inline-block; width:20px; height:20px; background:${note.color};"></span>`;
        row.insertCell(3).textContent = note.pin ? 'Tak' : 'Nie';
        row.insertCell(4).textContent = note.createdAt;
    });
}

// Wywołujemy funkcję, aby wyświetlić notatki przy załadowaniu strony
window.onload = displayNotes;
