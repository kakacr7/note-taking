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
  note?: Note;
  tags: Set<string>;
  scroll: boolean;
};

const NotePage: React.FC<NoteProps> = ({ id }) => {
  const note = id === "new" ? NotesModel.newNote() : NotesModel.getNote(id);
  const tags = new Set(note?.tags);
  const [state, setState] = useState<NoteState>({ note, tags, scroll: false });
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const saveNote = async () => {
    await present("Saving note...");
    const title = document.getElementById("note-title") as HTMLInputElement;
    const content = document.getElementById("note-content") as HTMLInputElement;
    if (!state.note) {
      state.note = NotesModel.newNote();
    }
    state.note.title = title.value;
    state.note.content = content.value;
    state.note.tags = state.tags;
    await NotesModel.saveNote(state.note);
    await dismiss();
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
            if (note) {
              await NotesModel.deleteNote(note);
            }
            await dismiss();
            router.push("/home", "back");
          },
        },
      ],
    });
  };

  const addTag = async () => {
    const tagInput = document.getElementById("tag-input") as HTMLInputElement;
    const { value } = tagInput;
    tagInput.value = "";
    if (value && !state.tags.has(value)) {
      state.tags.add(value);
      setState({ ...state, tags: new Set(state.tags), scroll: true });
    }
  };

  const removeTag = async (tag: string) => {
    state.tags.delete(tag);
    setState({ ...state, tags: new Set(state.tags), scroll: false });
  };

  useEffect(() => {
    if (state.scroll) {
      const footer = document.getElementById(
        "footer-container",
      ) as HTMLDivElement;
      footer.scrollLeft = footer.scrollWidth;
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
              value={note?.title}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonTextarea
              autoGrow={true}
              class="custom"
              placeholder="description"
              value={note?.content}
              id="note-content"
            ></IonTextarea>
          </IonItem>
        </IonContent>
        <div id="footer-container">
          <div id="resize">
            {[...state.tags].map((tag, index) => (
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
