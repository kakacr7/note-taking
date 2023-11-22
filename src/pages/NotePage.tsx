import { IonPage, IonRouterOutlet } from "@ionic/react";
import "./Main.css";
import { Route, RouteComponentProps } from "react-router";
import Note from "../components/Note";
import NewNote from "../components/NewNote";

const NotePage: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <IonPage>
        <IonRouterOutlet id="main">
          <Route path={match.url} exact={true} render={() => <NewNote />} />
          <Route
            path={`${match.url}/filter/:id`}
            exact={true}
            render={(props) => {
              const id = props.match.url.split("/").at(-1);
              return <Note id={id} />;
            }}
          />
        </IonRouterOutlet>
      </IonPage>
    </>
  );
};

export default NotePage;
