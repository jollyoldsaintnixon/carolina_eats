import * as APIUTIL from '../util/menu_items_util'

export const RECEIVE_MENU_ITEMS = "RECEIVE_MENU_ITEMS"
export const RECEIVE_MENU_ITEM_NAMES = "RECEIVE_MENU_ITEM_NAMES"
export const RECEIVE_MENU_ITEM_NAMES_ERRORS = "RECEIVE_MENU_ITEM_NAMES_ERRORS"
export const RECEIVE_MENU_ITEM = "RECEIVE_MENU_ITEM"
export const RECEIVE_MENU_ITEM_ERRORS = "RECEIVE_MENU_ITEM_ERRORS"
export const RECEIVE_SERVE_DATES = "RECEIVE_SERVE_DATES"
export const RECEIVE_SERVE_DATES_ERRORS = "RECEIVE_SERVE_DATES_ERRORS"

const receiveMenuItemsAction = menu_items => ({
    type: RECEIVE_MENU_ITEMS,
    menu_items
})

const receiveMenuItemAction = menu_item => ({
    type: RECEIVE_MENU_ITEM,
    menu_item
})

const receiveMenuItemErrorsAction = errors => ({
    type: RECEIVE_MENU_ITEM_ERRORS,
    errors
})

const receiveServeDatesAction = serve_dates => ({
    type: RECEIVE_SERVE_DATES,
    serve_dates
})

const receiveServeDatesErrorsAction = errors => ({
    type: RECEIVE_SERVE_DATES_ERRORS,
    errors
})

const receiveMenuItemNamesAction = menu_item_names => ({
    type: RECEIVE_MENU_ITEM_NAMES,
    menu_item_names
})

const receiveMenuItemNamesErrorsAction = errors => ({
    type: RECEIVE_MENU_ITEM_NAMES_ERRORS,
    errors
})

export const fetchMenuItemsActionCreator = () => (dispatch) => {
    const promise = APIUTIL.fetchMenuItems()
    return promise.then(menu_items => dispatch(receiveMenuItemsAction(menu_items)),
        error => {
            return dispatch(receiveMenuItemErrorsAction(error.responseText))
        })
}

export const fetchMenuItemActionCreator = (id) => (dispatch) => {
    const promise = APIUTIL.fetchMenuItem(id)
    return promise.then(menu_item => {
        return dispatch(receiveMenuItemAction(menu_item))},
        (error) => {
            dispatch(receiveMenuItemErrorsAction(error.responseText))}
            )
        }

export const fetchServeDatesActionCreator = (date) => dispatch => {
    const promise = APIUTIL.fetchServeDates(date)
    return promise.then(serve_dates => dispatch(receiveServeDatesAction(serve_dates)),
            error => {
                return dispatch(receiveServeDatesErrorsAction(error.responseText))
            }
        )
}

export const fetchMenuItemNamesActionCreator = () => dispatch => {
    const promise = APIUTIL.fetchMenuItemNames()
    return promise.then(menu_item_names => dispatch(receiveMenuItemNamesAction(menu_item_names)),
        error => {
            return dispatch(receiveMenuItemNamesErrorsAction(error.responseText))
        }
    )
}