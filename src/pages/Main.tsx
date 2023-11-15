import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import SideMenu from "../components/SideMenu";
import "./Main.css";

const Main: React.FC<RouteComponentProps> = ({ match }) => {
  const { filter } = match.params;

  return (
    <>
      <SideMenu />
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{filter}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{filter}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer filter={filter} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Main;
