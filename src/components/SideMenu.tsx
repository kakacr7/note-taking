import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { trash, pricetag, reader, closeOutline } from "ionicons/icons";
import NotesModel from "../models/NotesModel";
import "./SideMenu.css";

type MenuItem = {
  title: string;
  url: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { title: "All notes", url: "/home", icon: reader },
  { title: "Trash", url: "/home/trash", icon: trash },
];

const tags = NotesModel.getTags();

const SideMenu: React.FC = () => {
  const router = useIonRouter();
  const [presentAlert] = useIonAlert();

  const handleDeleteTag = (tag: string) => {
    presentAlert({
      header: `Delete tag "${tag}"?`,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            await NotesModel.deleteTag(tag);
            router.push("/home", "none");
          },
        },
      ],
    });
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLIonItemElement, MouseEvent>,
    url: string,
    tag: string,
  ) => {
    if (e.target.classList.contains("delete-tag-icon")) {
      handleDeleteTag(tag);
      return;
    }

    router.push(url, "forward");
  };

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
          {[...tags].map((tag, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  lines="none"
                  routerDirection="none"
                  onClick={(e) => {
                    handleItemClick(e, `/home/filter/${tag}`, tag);
                  }}
                >
                  <IonIcon slot="start" aria-hidden="true" icon={pricetag} />
                  <IonLabel>{tag}</IonLabel>
                  <IonIcon
                    slot="end"
                    aria-hidden="true"
                    icon={closeOutline}
                    className="delete-tag-icon"
                  />
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
