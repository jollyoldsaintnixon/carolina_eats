export const ESCAPE_SIGNAL = "ESCAPE_SIGNAL"

const sendEscapeSignalAction = () => ({
    type: ESCAPE_SIGNAL,
})

export const sendEscapeSignalActionCreator = 
    () => dispatch => (dispatch(sendEscapeSignalAction()))