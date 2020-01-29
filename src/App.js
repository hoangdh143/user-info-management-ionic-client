import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
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
import theme from "./theme";
import {createBrowserHistory} from "history";
// @ts-ignore
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import {RouteWithLayout} from "./components";
import {
    Account as AccountView,
    Dashboard as DashboardView, Icons as IconsView, NotFound as NotFoundView,
    ProductList as ProductListView, Settings as SettingsView, SignIn as SignInView, SignUp as SignUpView,
    Typography as TypographyView,
    UserList as UserListView
} from "./views";
import {Main as MainLayout, Minimal as MinimalLayout} from "./layouts";

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

export const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
    draw: chartjs.draw
});

validate.validators = {
    ...validate.validators,
    ...validators
};

const withLayout = Component => () => {
    return (
        <MainLayout>
            <Component/>
        </MainLayout>
    );
}

const App = () => (
    <IonApp>
        <Router history={browserHistory}>
            <ThemeProvider theme={theme}>
            <IonRouterOutlet>
                    {/*<Router history={browserHistory}>*/}
                    {/*    <Routes />*/}
                    {/*</Router>*/}
                <Route path="/home" component={withLayout(Home)} exact={true}/>
                <Redirect
                    exact
                    from="/"
                    to="/dashboard"
                />
                <RouteWithLayout
                    component={DashboardView}
                    exact
                    layout={MainLayout}
                    path="/dashboard"
                />
                <RouteWithLayout
                    component={UserListView}
                    exact
                    layout={MainLayout}
                    path="/users"
                />
                <RouteWithLayout
                    component={ProductListView}
                    exact
                    layout={MainLayout}
                    path="/products"
                />
                <RouteWithLayout
                    component={TypographyView}
                    exact
                    layout={MainLayout}
                    path="/typography"
                />
                <RouteWithLayout
                    component={IconsView}
                    exact
                    layout={MainLayout}
                    path="/icons"
                />
                <RouteWithLayout
                    component={AccountView}
                    exact
                    layout={MainLayout}
                    path="/account"
                />
                <RouteWithLayout
                    component={SettingsView}
                    exact
                    layout={MainLayout}
                    path="/settings"
                />
                <RouteWithLayout
                    component={SignUpView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-up"
                />
                <RouteWithLayout
                    component={SignInView}
                    exact
                    layout={MinimalLayout}
                    path="/sign-in"
                />
                <RouteWithLayout
                    component={NotFoundView}
                    exact
                    layout={MinimalLayout}
                    path="/not-found"
                />
            </IonRouterOutlet>
            </ThemeProvider>
        </Router>
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
