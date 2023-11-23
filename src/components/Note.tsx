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
import NotesModel, { Note } from "../models/NotesModel";
import "./Note.css";
import { useEffect, useState } from "react";

interface NoteProps {
  id: string;
}

type NoteState = {
  note?: Note;
  currNote?: Note;
  scroll: boolean;
  deleted: boolean;
};

const NotePage: React.FC<NoteProps> = ({ id }) => {
  const [state, setState] = useState<NoteState>({
    note: undefined,
    currNote: undefined,
    scroll: false,
    deleted: false,
  });

  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const saveNote = async () => {
    if (!state.currNote) {
      return;
    }

    await present("Saving note...");
    const title = document.getElementById("note-title") as HTMLInputElement;
    const content = document.getElementById("note-content") as HTMLInputElement;

    state.currNote.title = title.value;
    state.currNote.content = content.value;
    const note = await NotesModel.saveNote(state.currNote);
    await dismiss();
    setState({
      note,
      currNote: { ...note, tags: [...note.tags] },
      scroll: false,
      deleted: false,
    });
  };

  const deleteNote = async () => {
    presentAlert({
      header: "Move to trash?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            if (!state.currNote) {
              return;
            }
            await present("Move to trash...");
            await NotesModel.deleteNote(state.currNote);
            await dismiss();
            setState({
              note: undefined,
              currNote: undefined,
              scroll: false,
              deleted: true,
            });
          },
        },
      ],
    });
  };

  const addTag = async () => {
    const tagInput = document.getElementById("tag-input") as HTMLInputElement;
    const title = document.getElementById("note-title") as HTMLInputElement;
    const content = document.getElementById("note-content") as HTMLInputElement;

    const { value } = tagInput;
    tagInput.value = "";

    if (value && state.currNote && !state.currNote.tags.includes(value)) {
      state.currNote.title = title.value;
      state.currNote.content = content.value;
      state.currNote.tags.push(value);
      setState({ ...state, scroll: true });
    }
  };

  const removeTag = async (tag: string) => {
    if (state.currNote) {
      state.currNote.tags = state.currNote.tags.filter((t) => t !== tag);
      setState({ ...state, scroll: false });
    }
  };

  useEffect(() => {
    if (state.scroll) {
      const footer = document.getElementById(
        "footer-container",
      ) as HTMLDivElement;
      footer.scrollLeft = footer.scrollWidth;
      return;
    }

    if (state.deleted) {
      state.deleted = false;
      router.push("/home", "none");
      return;
    }

    if (!state.note || state.note.id !== id) {
      const getNote = async () => {
        let note = await NotesModel.getNoteById(id);
        if (!note) {
          note = NotesModel.newNote();
        }
        setState({
          note,
          currNote: { ...note, tags: [...note.tags] },
          scroll: false,
          deleted: false,
        });
      };
      getNote();
    }
  });

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
              value={state.currNote?.title}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonTextarea
              autoGrow={true}
              class="custom"
              placeholder="description"
              id="note-content"
              value={state.currNote?.content}
            ></IonTextarea>
          </IonItem>
        </IonContent>
        <div id="footer-container">
          <div id="resize">
            {state.currNote?.tags &&
              [...state.currNote?.tags].map((tag, index) => (
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
