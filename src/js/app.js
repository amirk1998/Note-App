import NoteAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

export default class App {
  constructor(root) {
    //
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const notes = NoteAPI.getAllNotes();
    // Set Notes :
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
    // Set Active Note :
    this.activeNote = notes[0];
    this.view.updateActiveNote(notes[0]);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        console.log('Note has been added');
      },
      onNoteEdit: (newTitle, newBody) => {
        console.log(newTitle, newBody);
      },
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find((n) => n.id == noteId);
        this.activeNote = selectedNote;
        this.view.updateActiveNote(selectedNote);
      },
      onNoteDelete: (noteId) => {
        console.log(noteId);
      },
    };
  }
}

// const view = new NotesView(app, {
//   onNoteAdd() {
//     console.log('Note has been added');
//   },
//   onNoteEdit(newTitle, newBody) {
//     console.log(newTitle, newBody);
//   },
//   onNoteSelect(noteId) {
//     console.log(noteId);
//   },
//   onNoteDelete(noteId) {
//     console.log(noteId);
//   },
// });
