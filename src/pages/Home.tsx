import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonRouterLink,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React from 'react';
import {Auth} from "aws-amplify";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
          will be your guide.
        </p>
          <button onClick={() => {Auth.signOut()}}>Sign Out</button>
          <Button variant="contained" color="primary">
              Hello World
          </Button>
          <Link to="/dashboard">Dashboard</Link>
          <IonButton href="/dashboard">Dashboard</IonButton>
          <IonRouterLink href="/dashboard">Dashboard 2</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Home;
