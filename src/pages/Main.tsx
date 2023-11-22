import { IonPage, IonRouterOutlet } from "@ionic/react";
import SideMenu from "../components/SideMenu";
import "./Main.css";
import { Route, RouteComponentProps } from "react-router";
import MainContainer from "../components/MainContainer";
import TrashContainer from "../components/TrashContainer";

const Main: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <SideMenu />
      <IonPage>
        <IonRouterOutlet id="main">
          <Route
            path={match.url}
            exact={true}
            render={() => <MainContainer />}
          />
          <Route path={`${match.url}/trash`} component={TrashContainer} />
          <Route
            path={`${match.url}/filter/:tag`}
            exact={true}
            render={(props) => {
              const { tag } = props.match.params;
              return <MainContainer tag={tag} />;
            }}
          />
        </IonRouterOutlet>
      </IonPage>
    </>
  );
};

export default Main;
