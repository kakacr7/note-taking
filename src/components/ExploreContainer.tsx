import "./ExploreContainer.css";
import NotesModel from "../models/NotesModel";
import { IonItem, IonLabel, IonList } from "@ionic/react";

interface ContainerProps {
  filter: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ filter }) => {
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
          <IonItem key={index} routerLink={`/note/${note.id}`}>
            <IonLabel>{note.title}</IonLabel>
          </IonItem>
        );
      })}
    </IonList>
  );
};

export default ExploreContainer;
