import { Note, notes, tags } from "./data";

const NotesModel = {
  getNotes: (): Note[] => notes.filter((note) => !note.trash),
  getTags: (): string[] => tags,
  getNote: (id: string): Note | undefined =>
    notes.find((note) => note.id === id),
  getNotesByTag: (tag: string): Note[] =>
    notes.filter((note) => !note.trash && note.tags.includes(tag)),
  getTrash: (): Note[] => notes.filter((note) => note.trash),
  newNote: (): Note => {
    const id = notes.length.toString();
    return {
      id,
      title: "New Note",
      content: "",
      tags: [],
      date: new Date().toLocaleString(),
      trash: false,
    };
  },
  saveNote: (note: Note): Note => {
    const index = notes.findIndex((n) => n.id === note.id);
    if (index === -1) {
      notes.push(note);
    } else {
      notes[index] = note;
    }
    return note;
  },
  deleteNote: (note: Note): void => {
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      notes[index].trash = true;
    }
  },
};

export default NotesModel;
