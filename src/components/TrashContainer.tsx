import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { create, trash } from "ionicons/icons";
import "./TrashContainer.css";
import NotesModel from "../models/NotesModel";
import { useState } from "react";

const TrashContainer: React.FC = () => {
  const notes = NotesModel.getTrash();
  const [state, setState] = useState(notes);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{"Trash"}</IonTitle>
          <IonCheckbox
            onIonChange={(e) => {
              console.log(e.detail.checked);
            }}
            slot="end"
          />
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                NotesModel.clearTrash();
                console.log("clear trash");
                setState([...NotesModel.getTrash()]);
              }}
            >
              <IonIcon icon={trash} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {state.map((note, index) => {
            return (
              <IonItem
                key={index}
                routerDirection="none"
                detail={false}
                routerLink={`/trash/${note.id}`}
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
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton routerDirection="forward" routerLink="/note/new">
            <IonIcon icon={create}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default TrashContainer;
