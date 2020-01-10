import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import config from "./config";
import {withAuthenticator} from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import {oAuthSignInButton} from "@aws-amplify/ui";

const oauth = {
    domain: config.authentication.oauth_domain,
    // scope: ['email', 'profile', 'openid'],
    redirectSignIn: config.authentication.redirect_url,
    redirectSignOut: config.authentication.redirect_url,
    responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
};

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
        endpoints: [
            {
                name: "contacts",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    },
    oauth
});

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/home" component={Home} exact={true}/>
                <Route exact path="/" render={() => <Redirect to="/home"/>}/>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

const MyTheme = {
    googleSignInButton: { backgroundColor: "red", borderColor: "red" },
    oAuthSignInButton: {display: "none"},
    button: {backgroundColor: "green", borderColor: "red"},
    signInButtonIcon: {display: "none"}
};

const federated = {
    google_client_id: config.social_login.google_client_id,
    facebook_app_id: config.social_login.facebook_app_id,
};

export default withAuthenticator(App, false, [], federated, MyTheme);
