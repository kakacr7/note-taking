import { Note, notes, tags } from "./data";

const NotesModel = {
  getNotes: (): Note[] => notes.filter((note) => !note.trash),
  getTags: (): Set<string> => tags,
  getNote: (id: string): Note | undefined =>
    notes.find((note) => note.id === id),
  getNotesByTag: (tag: string): Note[] =>
    notes.filter((note) => !note.trash && note.tags.has(tag)),
  getTrash: (): Note[] => notes.filter((note) => note.trash),
  newNote: (): Note => {
    const id = notes.length.toString();
    return {
      id,
      title: "New Note",
      content: "",
      tags: new Set([]),
      date: new Date().toLocaleString(),
      trash: false,
    };
  },
  saveNote: (note: Note): Note => {
    const index = notes.findIndex((n) => n.id === note.id);
    for (const tag of note.tags) {
      tags.add(tag);
    }
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
  deleteTag: (tag: string): void => {
    tags.delete(tag);
    notes.forEach((note) => note.tags.delete(tag));
  },
};

export default NotesModel;
