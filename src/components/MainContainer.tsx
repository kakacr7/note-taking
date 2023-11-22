import {
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { create } from "ionicons/icons";
import NotesContainter from "./NotesContainer";
import "./MainContainer.css";

interface MainContainerProps {
  tag?: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ tag }) => {
  const title = tag || "All Notes";

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <NotesContainter tag={tag} />
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton routerDirection="forward" routerLink="/note">
            <IonIcon icon={create}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default MainContainer;
