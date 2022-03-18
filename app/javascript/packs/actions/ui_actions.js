export const ESCAPE_SIGNAL = "ESCAPE_SIGNAL"
export const CLOSE_LIST_UI_ACTION = "CLOSE_LIST_UI_ACTION"

const sendEscapeSignalAction = () => ({
    type: ESCAPE_SIGNAL,
})

export const sendEscapeSignalActionCreator = 
    () => dispatch => (dispatch(sendEscapeSignalAction()))