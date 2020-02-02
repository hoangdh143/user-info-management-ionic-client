import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import {UsersToolbar, UsersTable} from './components';
import mockData from './data';
import {IonContent} from "@ionic/react";
import {AppContext} from "../../store/State";
import {useActions} from "../../store/useActions";
import {getUserListAction} from "../../store/actions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const UserList = () => {
    const classes = useStyles();

    const {state, makeAction} = useContext(AppContext);
    const users = state.userList;
    useEffect(() => {
        makeAction(getUserListAction());
    }, []);

    return (
        <IonContent>
            <div className={classes.root}>
                <UsersToolbar/>
                <div className={classes.content}>
                    <UsersTable users={users}/>
                </div>
            </div>
        </IonContent>
    );
};

export default UserList;
