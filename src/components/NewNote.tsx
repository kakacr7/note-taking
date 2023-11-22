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
import "./NewNote.css";
import { useEffect, useState } from "react";

type NewNoteState = {
  currNote: Note;
  scroll: boolean;
  deleted: boolean;
  id?: string;
};

const NotePage: React.FC = () => {
  const [state, setState] = useState<NewNoteState>({
    currNote: NotesModel.newNote(),
    scroll: false,
    deleted: false,
    id: undefined,
  });

  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const saveNote = async () => {
    await present("Saving note...");
    const title = document.getElementById("new-note-title") as HTMLInputElement;
    const content = document.getElementById(
      "new-note-content",
    ) as HTMLInputElement;

    const newNote = NotesModel.newNote();
    newNote.title = title.value;
    newNote.content = content.value;
    newNote.tags = [...state.currNote.tags];
    console.log(state);
    console.log(title.value);
    console.log(content.value);
    await NotesModel.saveNote(newNote);
    await dismiss();
    setState({
      currNote: NotesModel.newNote(),
      scroll: false,
      deleted: false,
      id: newNote.id,
    });
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
            await dismiss();
            setState({
              currNote: NotesModel.newNote(),
              scroll: false,
              deleted: true,
              id: undefined,
            });
          },
        },
      ],
    });
  };

  const addTag = async () => {
    const tagInput = document.getElementById(
      "new-tag-input",
    ) as HTMLInputElement;
    const title = document.getElementById("new-note-title") as HTMLInputElement;
    const content = document.getElementById(
      "new-note-content",
    ) as HTMLInputElement;

    const { value } = tagInput;
    tagInput.value = "";

    if (value && !state.currNote.tags.includes(value)) {
      state.currNote.title = title.value;
      state.currNote.content = content.value;
      state.currNote.tags.push(value);
      setState({ ...state, scroll: true, id: undefined, deleted: false });
    }
  };

  const removeTag = async (tag: string) => {
    const title = document.getElementById("new-note-title") as HTMLInputElement;
    const content = document.getElementById(
      "new-note-content",
    ) as HTMLInputElement;
    state.currNote.title = title.value;
    state.currNote.content = content.value;
    state.currNote.tags = state.currNote.tags.filter((t) => t !== tag);
    setState({ ...state, scroll: false, id: undefined, deleted: false });
  };

  useEffect(() => {
    if (state.scroll) {
      const footer = document.getElementById(
        "new-footer-container",
      ) as HTMLDivElement;
      footer.scrollLeft = footer.scrollWidth;
      return;
    }
    if (state.deleted) {
      state.deleted = false;
      router.push("/home", "none");
      return;
    }
    if (state.id) {
      const path = `/note/filter/${state.id}`;
      state.id = undefined;
      router.push(path, "none");
      return;
    }
    setState({
      currNote: NotesModel.newNote(),
      scroll: true,
      deleted: false,
      id: undefined,
    });
  });

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  setState({
                    currNote: NotesModel.newNote(),
                    scroll: false,
                    deleted: true,
                    id: undefined,
                  });
                }}
              >
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
              id="new-note-title"
              placeholder="Title"
              value={state.currNote.title || "New note"}
            ></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonTextarea
              autoGrow={true}
              class="custom"
              placeholder="description"
              value={state.currNote.content}
              id="new-note-content"
            ></IonTextarea>
          </IonItem>
        </IonContent>
        <div id="new-footer-container">
          <div id="new-resize">
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
              <input type="text" placeholder="tag" id="new-tag-input" />
            </form>
          </div>
        </div>
      </IonPage>
    </>
  );
};

export default NotePage;
