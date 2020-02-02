import React, { createContext, useReducer } from "react";
import {CREATE_USER, failure, GET_USER_LIST, success} from "./constants";
import {useActions} from "./useActions";

let AppContext = createContext();

const initialState = {
    userList: [],
    count: 0
};

let reducer = (state, action) => {
    switch (action.type) {
        case success(GET_USER_LIST):
            return { ...state, userList: action.userList };
        case failure(GET_USER_LIST):
            return { ...state, error: action.error };
        case success(CREATE_USER):
            return { ...state, userList: [action.user, ...state.userList]};
    }
    return state;
};

function AppContextProvider(props) {
    const fullInitialState = {
        ...initialState,
    }

    let [state, dispatch] = useReducer(reducer, fullInitialState);
    const makeAction = useActions(dispatch);
    let value = { state, makeAction };


    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
