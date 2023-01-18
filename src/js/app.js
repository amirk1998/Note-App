// import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// console.log(uuidv4());

import NoteAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

const app = document.getElementById('app');

const view = new NotesView(app, {
  onNoteAdd() {
    console.log('Note has been added');
  },
  onNoteEdit(newTitle, newBody) {
    console.log(newTitle, newBody);
  },
  onNoteSelect(noteId) {
    console.log(noteId);
  },
});

view.updateNoteList(NoteAPI.getAllNotes());

// const notes = [
//   {
//     id: 1,
//     title: 'First Note',
//     body: 'This is my first note',
//     updated: '2023-01-12T14:15:00.000Z',
//   },
//   {
//     id: 2,
//     title: 'Second Note',
//     body: 'This is my second note',
//     updated: '2023-01-16T09:15:00.000Z',
//   },
//   {
//     id: 3,
//     title: 'Third Note',
//     body: 'This is my third note',
//     updated: '2023-01-17T14:57:00.336Z',
//   },
//   {
//     id: 4,
//     title: 'Delete Note',
//     body: 'Dummy Text',
//     updated: '2023-01-11T06:15:00.000Z',
//   },
// ];

// console.log(NoteAPI.getAllNotes());
