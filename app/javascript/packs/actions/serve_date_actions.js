import * as APIUTIL from '../util/serve_dates_util'

export const RECEIVE_LIKED_SERVE_DATES = "RECEIVED_LIKED_SERVE_DATES"
export const RECEIVE_SERVE_DATES = "RECEIVE_SERVE_DATES"
export const RECEIVE_SERVE_DATES_ERRORS = "RECEIVE_SERVE_DATES_ERRORS"

const receiveServeDatesAction = serve_dates => ({
    type: RECEIVE_SERVE_DATES,
    serve_dates
})

const receiveServeDatesErrorsAction = errors => ({
    type: RECEIVE_SERVE_DATES_ERRORS,
    errors
})


export const fetchServeDatesActionCreator = (date) => dispatch => {
    const promise = APIUTIL.fetchServeDates(date)
    return promise.then(serve_dates => dispatch(receiveServeDatesAction(serve_dates)),
            error => {
                return dispatch(receiveServeDatesErrorsAction(error.responseText))
            }
        )
}