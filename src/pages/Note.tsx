import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import { arrowBack, informationCircle, save, trash } from "ionicons/icons";
import "./Note.css";

function Example({ id }) {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/home/all" routerDirection="none">
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton>
                <IonIcon icon={informationCircle} />
              </IonButton>
              <IonButton>
                <IonIcon icon={save} />
              </IonButton>
              <IonButton>
                <IonIcon icon={trash} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem>
            <IonInput placeholder="Title"></IonInput>
          </IonItem>
          <IonItem lines="none">
            <IonTextarea
              autoGrow={true}
              class="custom"
              placeholder="description"
            ></IonTextarea>
          </IonItem>
        </IonContent>
        <IonFooter>
          <form>
            <IonInput placeholder="tag"></IonInput>
          </form>
        </IonFooter>
      </IonPage>
    </>
  );
}
export default Example;
