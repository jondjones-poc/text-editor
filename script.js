const addButton = document.getElementById('add');

const updateStorage = () => {
    const notesElements = document.querySelectorAll('textarea');
    const notes = [];

    notesElements.forEach(note => notes.push(note.value));
    localStorage.setItem('note', JSON.stringify(notes));
}

const addNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');
    
    note.innerHTML = `
    <div class="tools">
        <button class="edit">
            <i class="fas fa-edit"></i>
        </button>
        <button class="delete">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>`;

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = text;
    main.innerHTML = marked(text);

    deleteButton.addEventListener('click', () => {
        note.remove();
        updateStorage();
    })

    editButton.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);

        updateStorage();
    })
    document.body.appendChild(note);
}

const readFromStorage = () => {
    const notes = JSON.parse(localStorage.getItem('note'));
    console.log(notes)
    notes?.forEach(item => addNote(item));
}

readFromStorage();
addButton.addEventListener('click', () => addNote());