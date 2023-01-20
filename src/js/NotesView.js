export default class NotesView {
  //
  constructor(root, handlers) {
    this.root = root;
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
    <div class="notes-sidebar z-10 h-screen w-64 sticky top-0 right-0 flex flex-col bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 transition-all duration-300 ease-out pt-6 px-3 pb-[0.2rem] rounded-tl-[100px]">
        <div class="notes-logo uppercase text-5xl tracking-[0.2rem] font-extrabold border-b-[1px] border-solid border-white border-opacity-20 py-8 px-0 text-center text-white">NOTE APP</div>
        <div class="notes-list flex-grow my-4 overflow-auto scrollbar-hide">
        <!-- Note List -->
        </div>
        <button class="add-notes bg-emerald-600 hover:bg-emerald-500 border-none rounded-lg text-violet-100 cursor-pointer text-xl font-bold mb-4 py-3 px-0 w-full transition-all duration-300 ease-in-out" aria-label="add-notes">Add Note</button>
      </div>
      <div class="notes-preview hidden flex flex-col py-8 px-12 flex-grow">
        <input type="text" name="notes-title" id="notes-title" class="notes-title border-none outline-none w-full rounded-2xl py-4 px-6 font-bold text-5xl" aria-label="notes-title" placeholder="Note Title ... " />
        <textarea name="notes-body" id="notes-body" class="notes-body border-none outline-none w-full rounded-2xl py-4 px-6 flex-grow text-xl leading-6 mt-8 resize-none" aria-label="notes-body" placeholder="Take some notes ..."></textarea>
      </div>
    `;

    const addNoteBtn = this.root.querySelector('.add-notes');
    const inputTitle = this.root.querySelector('.notes-title');
    const inputBody = this.root.querySelector('.notes-body');

    addNoteBtn.addEventListener('click', () => {
      // Execute add note
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener('blur', () => {
        //
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    // hide notes preview in first load
    // this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const Max_Body_Length = 50;
    const date = new Date(updated).toLocaleString('en', { dateStyle: 'full', timeStyle: 'short' });
    return `<!-- Item -->
    <div x-data="{selectedNote : '' , ActiveNote : false , defaultClass : 'text-white' , activeClass : 'bg-gray-100 text-neutral-500'}">
      <div @click="selectedNote = ${id} " :class="ActiveNote ? activeClass : defaultClass" class="notes-item-div rounded-xl" data-note-id="${id}">
        <div class="notes-list-item my-4 cursor-pointer rounded-xl border-b-[1px] border-solid border-white border-opacity-20 pb-2" data-note-id="${id}">
        <div class="flex items-center justify-between">
        <div class="notes-small-title p-3 text-xl">${title}</div>
        <span class="note-list-trash ml-2" data-note-id="${id}"
          ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 stroke-red-500 hover:stroke-red-300">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </span>
        </div>
      <div class="notes-small-body px-3 py-0">${body.substring(0, Max_Body_Length)} ${body.length > Max_Body_Length ? '...' : ''}</div>
      <div class="notes-small-updated p-3 text-left italic text-neutral-400">${date}</div>
    </div>
  </div>
</div>

      <!-- <hr class="border-white border-opacity-20"> -->
    `;
  }

  updateNoteList(notes) {
    //
    const notesContainer = this.root.querySelector('.notes-list');

    // empty note list
    notesContainer.innerHTML = '';
    let notesList = '';
    for (const note of notes) {
      const { id, title, body, updated } = note;
      const htmlNoteList = this._createListItemHTML(id, title, body, updated);
      notesList += htmlNoteList;
    }
    notesContainer.innerHTML = notesList;
    notesContainer.querySelectorAll('.notes-list-item').forEach((noteItem) => {
      noteItem.addEventListener('click', () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });

    notesContainer.querySelectorAll('.note-list-trash').forEach((noteItem) => {
      noteItem.addEventListener('click', (event) => {
        event.stopPropagation();
        this.onNoteDelete(noteItem.dataset.noteId);
      });
    });
  }

  updateActiveNote(note) {
    //
    this.root.querySelector('.notes-title').value = note.title;
    this.root.querySelector('.notes-body').value = note.body;

    // add selected Class
    // this.root.querySelector(`.notes-item-div[data-note-id="${note.id}"]`).classList.remove('text-white');
    // this.root.querySelector(`.notes-item-div[data-note-id="${note.id}"]`).classList.add('bg-gray-100');
    // this.root.querySelector(`.notes-item-div[data-note-id="${note.id}"]`).classList.add('text-neutral-500');
  }

  updateNotePreviewVisibility(condition) {
    //
    this.root.querySelector('.notes-preview').classList.remove(condition ? 'hidden' : 'visible');
  }
}
