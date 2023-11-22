// import { Note, notes, tags } from "./data";
import { Preferences } from "@capacitor/preferences";

type Tags = Set<string>;

export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  trash: boolean;
};

const NotesModel = {
  getNotes: async (): Promise<Note[]> => {
    const notes = await Preferences.get({ key: "notes" });
    return JSON.parse(notes.value || "[]");
  },
  getAllNotes: async (): Promise<Note[]> => {
    const notes = await NotesModel.getNotes();
    return notes.filter((note) => !note.trash);
  },
  getNoteById: async (id: string): Promise<Note | undefined> => {
    const notes = await NotesModel.getNotes();
    return notes.find((note) => note.id === id);
  },
  saveNote: async (note: Note): Promise<Note> => {
    const notes = await NotesModel.getNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    if (index === -1) {
      notes.push(note);
    } else {
      notes[index] = note;
    }
    await Preferences.set({ key: "notes", value: JSON.stringify(notes) });
    return note;
  },
  deleteNote: async (note?: Note): Promise<void> => {
    if (!note) {
      return;
    }
    const notes = await NotesModel.getNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      notes[index].trash = true;
    }
    await Preferences.set({ key: "notes", value: JSON.stringify(notes) });
  },
  restoreNote: async (note?: Note): Promise<void> => {
    if (!note) {
      return;
    }
    const notes = await NotesModel.getNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      notes[index].trash = false;
    }
    await Preferences.set({ key: "notes", value: JSON.stringify(notes) });
  },
  excludeNote: async (note?: Note): Promise<void> => {
    if (!note) {
      return;
    }
    const notes = await NotesModel.getNotes();
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      notes.splice(index, 1);
    }
    await Preferences.set({ key: "notes", value: JSON.stringify(notes) });
  },
  getTrash: async (): Promise<Note[]> => {
    const notes = await NotesModel.getNotes();
    return notes.filter((note) => note.trash);
  },
  clearTrash: async (): Promise<void> => {
    const notes = await NotesModel.getNotes();
    let i = 0;
    while (i < notes.length) {
      if (notes[i].trash) {
        notes.splice(i, 1);
      } else {
        i++;
      }
    }
    await Preferences.set({ key: "notes", value: JSON.stringify(notes) });
  },
  newNote: (): Note => {
    const id = crypto.randomUUID();
    return {
      id,
      title: "New Note",
      content: "",
      tags: [],
      trash: false,
    };
  },
  getTags: async (): Promise<Tags> => {
    const notes = await NotesModel.getNotes();
    const tags = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        tags.add(tag);
      });
    });
    return tags;
  },
  getNotesByTag: async (tag: string): Promise<Note[]> => {
    const notes = await NotesModel.getNotes();
    return notes.filter((note) => !note.trash && note.tags.includes(tag));
  },
  deleteTag: async (tag: string): Promise<void> => {
    const notes = await NotesModel.getNotes();
    const newNotes = notes.map((note) => {
      note.tags = note.tags.filter((t) => t !== tag);
      return note;
    });
    await Preferences.set({ key: "notes", value: JSON.stringify(newNotes) });
  },
};

// const NotesModel = {
//   getNotes: (): Note[] => notes.filter((note) => !note.trash),
//   getAllNotes: (): Note[] => notes,
//   getTags: (): Set<string> => tags,
//   getNote: (id: string): Note | undefined =>
//     notes.find((note) => note.id === id),
//   getNotesByTag: (tag: string): Note[] =>
//     notes.filter((note) => !note.trash && note.tags.has(tag)),
//   getTrash: (): Note[] => notes.filter((note) => note.trash),
//   newNote: (): Note => {
//     const id = crypto.randomUUID();
//     return {
//       id,
//       title: "New Note",
//       content: "",
//       tags: new Set([]),
//       date: new Date().toLocaleString(),
//       trash: false,
//     };
//   },
//   saveNote: (note: Note): Note => {
//     const index = notes.findIndex((n) => n.id === note.id);
//     for (const tag of note.tags) {
//       tags.add(tag);
//     }
//     if (index === -1) {
//       notes.push(note);
//     } else {
//       notes[index] = note;
//     }
//     return note;
//   },
//   deleteNote: (note: Note): void => {
//     const index = notes.findIndex((n) => n.id === note.id);
//     if (index !== -1) {
//       notes[index].trash = true;
//     }
//   },
//   deleteTag: (tag: string): void => {
//     tags.delete(tag);
//     notes.forEach((note) => note.tags.delete(tag));
//   },
//   restoreNote: (note: Note): void => {
//     const index = notes.findIndex((n) => n.id === note.id);
//     if (index !== -1) {
//       notes[index].trash = false;
//     }
//   },
//   excludeNote: (note: Note): void => {
//     const index = notes.findIndex((n) => n.id === note.id);
//     if (index !== -1) {
//       notes.splice(index, 1);
//     }
//   },
//   clearTrash: (): void => {
//     let i = 0;
//     while (i < notes.length) {
//       if (notes[i].trash) {
//         notes.splice(i, 1);
//       } else {
//         i++;
//       }
//     }
//   },
// };

export default NotesModel;
