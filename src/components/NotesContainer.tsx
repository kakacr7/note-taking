import NotesModel from "../models/NotesModel";
import { IonItem, IonList, useIonRouter } from "@ionic/react";
import "./NotesContainer.css";

interface NotesContainerProps {
  tag?: string;
}

const NotesContainter: React.FC<NotesContainerProps> = ({ tag }) => {
  const notes = tag ? NotesModel.getNotesByTag(tag) : NotesModel.getNotes();

  return (
    <IonList>
      {notes.map((note, index) => {
        return (
          <IonItem
            key={index}
            routerDirection="none"
            detail={false}
            routerLink={`/note/${note.id}`}
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
