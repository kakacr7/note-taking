import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonPopover,
  IonTextarea,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonPopover,
  useIonRouter,
} from "@ionic/react";
import { arrowBack, ellipsisVertical } from "ionicons/icons";
import NotesModel from "../models/NotesModel";
import "./TrashContainer.css";

interface NoteProps {
  id: string;
}

const TrashNoteContainer: React.FC<NoteProps> = ({ id }) => {
  const router = useIonRouter();
  const note = NotesModel.getNote(id);

  const [present, dismiss] = useIonLoading();
  const [presentAlert, dismissAlert] = useIonAlert();

  const handleDelete = async () => {
    dismissAlert();
    await present({
      message: "Deleting...",
    });
    await NotesModel.excludeNote(note);
    await dismiss();
    router.push("/home/trash", "none");
  };

  const handleRestore = async () => {
    dismissPopover();
    await present({
      message: "Restoring...",
    });
    await NotesModel.restoreNote(note);
    await dismiss();
    router.push("/home/trash", "none");
  };

  const handleDeleteAlert = () => {
    dismissPopover();
    presentAlert({
      header: "Delete Note",
      message: "Are you sure you want to delete this note?",
      buttons: [
        "Cancel",
        {
          text: "Delete",
          handler: handleDelete,
        },
      ],
    });
  };

  const Popover = () => (
    <>
      <IonItem lines="none" onClick={() => handleRestore()}>
        Restore
      </IonItem>
      <IonItem lines="none" onClick={() => handleDeleteAlert()}>
        Delete
      </IonItem>
    </>
  );

  const [showPopover, dismissPopover] = useIonPopover(Popover);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/home/trash" routerDirection="back">
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                id="options"
                onClick={(e) => showPopover({ event: e })}
              >
                <IonIcon icon={ellipsisVertical} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              id="note-title"
              placeholder="Title"
              value={note?.title}
              readonly={true}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonTextarea
              autoGrow={true}
              class="custom"
              placeholder="description"
              value={note?.content}
              id="note-content"
              readonly={true}
            ></IonTextarea>
          </IonItem>
        </IonContent>
        <div id="footer-container">
          <div id="resize">
            {note
              ? [...note.tags].map((tag, index) => (
                  <IonChip key={index}>
                    <IonLabel>{tag}</IonLabel>
                  </IonChip>
                ))
              : null}
          </div>
        </div>
      </IonPage>
    </>
  );
};

export default TrashNoteContainer;
