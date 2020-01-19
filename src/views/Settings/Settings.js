import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {Notifications, Password} from './components';
import {IonContent} from "@ionic/react";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Settings = () => {
    const classes = useStyles();

    return (
        <IonContent>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={4}
                >
                    <Grid
                        item
                        md={7}
                        xs={12}
                    >
                        <Notifications/>
                    </Grid>
                    <Grid
                        item
                        md={5}
                        xs={12}
                    >
                        <Password/>
                    </Grid>
                </Grid>
            </div>
        </IonContent>
    );
};

export default Settings;
