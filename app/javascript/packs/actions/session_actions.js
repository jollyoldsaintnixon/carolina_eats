import * as APIUTIL from '../util/session_util'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOG_OUT = 'LOG_OUT'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS'

const receiveCurrentUser = user => {
    return ({
        type: RECEIVE_CURRENT_USER,
        user
    })
}

const logOutUser = () => {
    return ({
        type: LOG_OUT,
    })
}

const recieveSessionErrors = errors => {
    return ({
        type: RECEIVE_SESSION_ERRORS,
        errors
    })
}

const clearSessionErrors = () => {
    return ({
        type: CLEAR_SESSION_ERRORS
    })
}

export const logInActionCreator = (user) => dispatch => {
    return APIUTIL.sendLogIn(user)
        .then(
            (new_user) => dispatch(receiveCurrentUser(new_user)),
            errors => dispatch(recieveSessionErrors(errors.responseText))
            )
}

export const signUpActionCreator = user => dispatch => {
    return APIUTIL.sendSignUp(user)
        .then(
            new_user => {
                dispatch(receiveCurrentUser(new_user))},
            errors => {
                dispatch(recieveSessionErrors(errors.responseJSON))}
        )
}

export const logOutActionCreator = () => dispatch => {
    return APIUTIL.sendLogOut()
        .then(
            () => dispatch(logOutUser()),
            errors => dispatch(recieveSessionErrors(errors.responseText))
        )
}