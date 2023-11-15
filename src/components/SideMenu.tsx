import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";
import { trash, pricetag, reader } from "ionicons/icons";
import NotesModel from "../models/NotesModel";
import "./SideMenu.css";

type MenuItem = {
  title: string;
  url: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { title: "All notes", url: "/home/all", icon: reader },
  { title: "Trash", url: "/home/trash", icon: trash },
];

const tags = NotesModel.getTags();

const SideMenu: React.FC = () => {
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Note taking</IonListHeader>
          {menuItems.map((item, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                routerLink={item.url}
                lines="none"
                detail={false}
                routerDirection="none"
              >
                <IonIcon slot="start" icon={item.icon} aria-hidden="true" />
                <IonLabel>{item.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
        <IonList id="labels-list">
          <IonListHeader>Tags</IonListHeader>
          {tags.map((tag, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem lines="none" routerLink={`/home/${tag}`}>
                  <IonIcon slot="start" aria-hidden="true" icon={pricetag} />
                  <IonLabel>{tag}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
