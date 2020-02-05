import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';

import {ReviewsToolbar, ReviewsTable} from './components';
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

const ReviewList = () => {
    const classes = useStyles();

    const {state, makeAction} = useContext(AppContext);
    const users = state.userList;
    useEffect(() => {
        makeAction(getUserListAction());
    }, []);

    return (
        <IonContent>
            <div className={classes.root}>
                <ReviewsToolbar/>
                <div className={classes.content}>
                    <ReviewsTable users={users}/>
                </div>
            </div>
        </IonContent>
    );
};

export default ReviewList;
