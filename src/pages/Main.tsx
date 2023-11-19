import { IonPage, IonRouterOutlet } from "@ionic/react";
import SideMenu from "../components/SideMenu";
import "./Main.css";
import { Redirect, Route, RouteComponentProps } from "react-router";
import MainContainer from "../components/MainContainer";

const Main: React.FC<RouteComponentProps> = ({ match }) => {
  const t = (props, name) => {
    console.log(props.match);
    return <h1>{name}</h1>;
  };
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
          <Route
            path={`${match.url}/trash`}
            render={(props) => t(props, "trash")}
          />
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
