import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import NotesContainter from "../components/NotesContainer";
import { create } from "ionicons/icons";
import SideMenu from "../components/SideMenu";
import "./Main.css";

type MainProps = {
  filter: string;
};

const Main: React.FC<MainProps> = ({ filter }) => {
  const title =
    filter === "all" ? "All Notes" : filter === "trash" ? "Trash" : filter;

  return (
    <>
      <SideMenu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <NotesContainter filter={filter} />
          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonFabButton routerDirection="none" routerLink="/note/1">
              <IonIcon icon={create}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Main;
