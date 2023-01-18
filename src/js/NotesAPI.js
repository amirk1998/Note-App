import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
export default class NoteAPI {
  //
  static getAllNotes() {
    //
    const savedNotes = JSON.parse(localStorage.getItem('notes-app')) || [];
    // const savedNotes = notes;
    return savedNotes.sort((a, b) => {
      // a : First Item , b : Second Item
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    // 1. Notes existed or not
    const notes = NoteAPI.getAllNotes();
    const existedNote = notes.find((item) => item.id == noteToSave.id);

    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      // noteToSave.id = uuidv4();
      // noteToSave.id = new Date().getTime();
      noteToSave.id = uuidv4();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    localStorage.setItem('notes-app', JSON.stringify(notes));
  }

  static deleteNote(id) {
    //
    const notes = NoteAPI.getAllNotes();
    const filteredNotes = notes.filter((item) => item.id != id);
    localStorage.setItem('notes-app', JSON.stringify(filteredNotes));
  }
}
