import * as APIUTIL from '../util/menu_items_util'

export const RECEIVE_MENU_ITEMS = "RECEIVE_MENU_ITEMS"
export const RECEIVE_MENU_ITEM_NAMES = "RECEIVE_MENU_ITEM_NAMES"
export const RECEIVE_MENU_ITEM_NAMES_ERRORS = "RECEIVE_MENU_ITEM_NAMES_ERRORS"
export const RECEIVE_MENU_ITEM = "RECEIVE_MENU_ITEM"
export const RECEIVE_MENU_ITEM_ERRORS = "RECEIVE_MENU_ITEM_ERRORS"
export const RECEIVE_SERVE_DATES = "RECEIVE_SERVE_DATES"
export const RECEIVE_SERVE_DATES_ERRORS = "RECEIVE_SERVE_DATES_ERRORS"
export const RECEIVE_LIKED_INDEX = "RECEIVE_LIKED_INDEX"
export const RECEIVE_LIKED_INDEX_ERRORS = "RECEIVE_LIKED_INDEX_ERRORS"
export const POST_LIKED_ITEM = "POST_LIKED_ITEM"
export const DELETE_LIKED_ITEM = "DELETE_LIKED_ITEM"

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

const receiveLikedIndexAction = liked_menu_items => ({
    type: RECEIVE_LIKED_INDEX,
    liked_menu_items
})

const receiveLikedIndexErrorsAction = errors => ({
    type: RECEIVE_LIKED_INDEX_ERRORS,
    errors
})

const postLikedItemAction = liked_item => ({
    type: POST_LIKED_ITEM,
    liked_item
})

const deleteLikedItemAction = item_id => ({
    type: DELETE_LIKED_ITEM,
    item_id
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

export const fetchLikedMenuItemsActionCreator = () => dispatch => {
    const promise = APIUTIL.fetchLikedMenuItems()
    return promise.then(menu_items => dispatch(receiveLikedIndexAction(menu_items)),
        error => {
            return dispatch(receiveLikedIndexErrorsAction(error.responseText))
        }
    )
}

export const saveLikedItemActionCreator = (item_name) => dispatch => {
    const promise = APIUTIL.postLikedItem(item_name)
    return promise.then(liked_item => dispatch(postLikedItemAction(liked_item)))
}

export const deleteLikedItemActionCreator = (item_id) => dispatch => {
    APIUTIL.deleteLikedItem(item_id)
        .then(item_id => dispatch(deleteLikedItemAction(item_id))) 
}