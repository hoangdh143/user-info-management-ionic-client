import {CREATE_USER, failure, GET_USER_LIST, sendRequest, success} from "./constants";

export const getUserListAction = () => ({
    type: sendRequest(GET_USER_LIST),
});

export const getUserListSuccessAction = (userList) => ({
   type: success(GET_USER_LIST),
    userList
});

export const getUserListFailureAction = (error) => ({
    type: failure(GET_USER_LIST),
    error
});

export const createUserAction = (user) => ({
    type: sendRequest(CREATE_USER),
    user
});

export const createUserSuccessAction = user => ({
    type: success(CREATE_USER),
    user
});

export const createUserfailureAction = error => ({
    type: failure(CREATE_USER),
    error
})

