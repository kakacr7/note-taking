import { notes, tags } from "./data";

const NotesModel = {
  getNotes: () => notes.filter((note) => !note.trash),
  getTags: () => tags,
  getNote: (id: string) => notes.find((note) => note.id === id),
  getNotesByTag: (tag: string) =>
    notes.filter((note) => !note.trash && note.tags.includes(tag)),
  getTrash: () => notes.filter((note) => note.trash),
  // getNotesBySearch: (search: string) =>
  // notes.filter((note) => note.title.includes(search)),
};

export default NotesModel;
