import {failure, GET_USER_LIST, sendRequest, success} from "./constants";

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
