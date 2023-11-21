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
  IonTextarea,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { arrowBack, closeCircle, save, trash } from "ionicons/icons";
import NotesModel from "../models/NotesModel";
import "./Note.css";
import { useEffect, useState } from "react";
import { Note } from "../models/data";

interface NoteProps {
  id: string;
}

type NoteState = {
  note: Note;
  currNote: Note;
  scroll: boolean;
  deleted: boolean;
};

const NotePage: React.FC<NoteProps> = ({ id }) => {
  // window.location.reload();
  const note = NotesModel.getNote(id) || NotesModel.newNote();
  const [state, setState] = useState<NoteState>({
    note,
    currNote: { ...note, tags: new Set(note.tags) },
    scroll: false,
    deleted: false,
  });
  console.log("Rendering NotePage");
  if (note.id !== state.note.id && id !== "new") {
    setState({
      note,
      currNote: { ...note, tags: new Set(note.tags) },
      scroll: false,
      deleted: false,
    });
  }
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const saveNote = async () => {
    await present("Saving note...");
    const title = document.getElementById("note-title") as HTMLInputElement;
    const content = document.getElementById("note-content") as HTMLInputElement;

    state.currNote.title = title.value;
    state.currNote.content = content.value;
    await NotesModel.saveNote(state.currNote);
    await dismiss();
    setState({ ...state });
  };

  const deleteNote = async () => {
    presentAlert({
      header: "Delete note?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            await present("Deleting note...");
            await NotesModel.deleteNote(state.currNote);
            await dismiss();
            setState({ ...state, deleted: true });
          },
        },
      ],
    });
  };

  const addTag = async () => {
    const tagInput = document.getElementById("tag-input") as HTMLInputElement;
    const title = document.getElementById("note-title") as HTMLInputElement;
    const content = document.getElementById("note-content") as HTMLInputElement;

    state.currNote.title = title.value;
    state.currNote.content = content.value;

    const { value } = tagInput;
    tagInput.value = "";

    if (value && !state.currNote.tags.has(value)) {
      state.currNote.tags.add(value);
      setState({ ...state, scroll: true });
    }
  };

  const removeTag = async (tag: string) => {
    state.currNote.tags.delete(tag);
    setState({ ...state, scroll: false });
  };

  useEffect(() => {
    if (state.scroll) {
      const footer = document.getElementById(
        "footer-container",
      ) as HTMLDivElement;
      footer.scrollLeft = footer.scrollWidth;
    }
    if (state.deleted) {
      router.push("/home", "none");
    }
  }, [state]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/home" routerDirection="back">
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={saveNote}>
                <IonIcon icon={save} />
              </IonButton>
              <IonButton onClick={deleteNote}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput
              id="note-title"
              placeholder="Title"
              value={state.currNote.title}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonTextarea
              autoGrow={true}
              class="custom"
              placeholder="description"
              value={state.currNote.content}
              id="note-content"
            ></IonTextarea>
          </IonItem>
        </IonContent>
        <div id="footer-container">
          <div id="resize">
            {[...state.currNote.tags].map((tag, index) => (
              <IonChip key={index}>
                <IonLabel>{tag}</IonLabel>
                <IonIcon
                  onClick={() => removeTag(tag)}
                  icon={closeCircle}
                ></IonIcon>
              </IonChip>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTag();
              }}
              color={"light"}
            >
              <input type="text" placeholder="tag" id="tag-input" />
            </form>
          </div>
        </div>
      </IonPage>
    </>
  );
};

export default NotePage;
