import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Main from "./pages/Main";
import Note from "./pages/Note";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/home/:filter"
            exact={true}
            render={(props) => {
              const filter =
                props.match.params.filter || props.match.url.split("/").at(-1);
              return <Main filter={filter} />;
            }}
          ></Route>
          <Route
            path="/note/:id"
            exact={true}
            render={(props) => {
              const { id } =
                props.match.params || props.match.url.split("/").at(-1);
              return <Note id={id} />;
            }}
          ></Route>
          <Route render={() => <Redirect to={"/home/all"} />}></Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
