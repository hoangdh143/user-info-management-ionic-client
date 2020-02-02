import {CREATE_USER, failure, GET_USER_LIST, sendRequest, success} from "./constants";
import {ApiCalls} from "../helpers/ApiCalls";
import {getUserListFailureAction, getUserListSuccessAction} from "./actions";

export const useActions = dispatch => action => {
    switch (action.type) {
        case sendRequest(GET_USER_LIST):
            ApiCalls.getContacts().then(
                contacts => dispatch(getUserListSuccessAction(contacts))
            ).catch(error => dispatch(getUserListFailureAction(error)));
            break;
        case sendRequest(CREATE_USER):
            break;
        case success(CREATE_USER):
            break;
        case failure(CREATE_USER):
            break;
    }
};
