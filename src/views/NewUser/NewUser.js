import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Grid} from '@material-ui/core';

import {IonContent} from "@ionic/react";
import UserForm from "./components/UserForm/UserForm";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const NewUser = () => {
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
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                    >
                        <UserForm/>
                    </Grid>
                </Grid>
            </div>
        </IonContent>
    );
};

export default NewUser;
