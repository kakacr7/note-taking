import NotesModel from "../models/NotesModel";
import { Note } from "../models/NotesModel";
import { IonItem, IonList } from "@ionic/react";
import "./NotesContainer.css";
import { useEffect, useState } from "react";

interface NotesContainerProps {
  tag?: string;
}

const NotesContainter: React.FC<NotesContainerProps> = ({ tag }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    console.log("NotesContainer.tsx: useEffect()");
    const getNotes = async () => {
      const tagNotes = tag
        ? await NotesModel.getNotesByTag(tag)
        : await NotesModel.getAllNotes();

      const ids = tagNotes.map((note) => note.id);

      const eqNotesList = (xs: Note[], ys: string[]) =>
        xs.length === ys.length && xs.every((x) => ys.includes(x.id));

      if (!eqNotesList(notes, ids)) {
        setNotes(tagNotes);
      }
    };
    getNotes();
  });

  return (
    <IonList>
      {notes.map((note, index) => {
        return (
          <IonItem
            key={index}
            routerDirection="none"
            detail={false}
            routerLink={`/note/filter/${note.id}`}
            lines="none"
            className="ion-margin-bottom"
          >
            <div className="note-item">
              <h6>{note.title}</h6>
              <p className="note-content">{note.content}</p>
            </div>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default NotesContainter;
