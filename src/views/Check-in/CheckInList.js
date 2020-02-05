import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import {IonContent} from "@ionic/react";
import {AppContext} from "../../store/State";
import {getUserListAction} from "../../store/actions";
import {CheckInTable} from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const CheckInList = () => {
    const classes = useStyles();

    const {state, makeAction} = useContext(AppContext);
    const users = state.userList;
    useEffect(() => {
        makeAction(getUserListAction());
    }, []);

    return (
        <IonContent>
            <div className={classes.root}>
                <div className={classes.content}>
                    <CheckInTable users={users}/>
                </div>
            </div>
        </IonContent>
    );
};

export default CheckInList;
