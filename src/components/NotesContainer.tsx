import "./NotesContainer.css";
import NotesModel from "../models/NotesModel";
import { IonItem, IonLabel, IonList } from "@ionic/react";

interface NotesContainerProps {
  filter: string;
}

const NotesContainter: React.FC<NotesContainerProps> = ({ filter }) => {
  const notes =
    filter === "all"
      ? NotesModel.getNotes()
      : filter === "trash"
      ? NotesModel.getTrash()
      : NotesModel.getNotesByTag(filter);

  return (
    <IonList>
      {notes.map((note, index) => {
        return (
          <IonItem
            key={index}
            routerDirection="none"
            detail={false}
            routerLink={`/note/${note.id}`}
          >
            <IonLabel>{note.title}</IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default NotesContainter;
