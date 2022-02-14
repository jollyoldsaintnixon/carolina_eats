import * as APIUTIL from '../util/menu_items_util'

export const RECEIVE_MENU_ITEMS = "RECEIVE_MENU_ITEMS"
export const RECEIVE_MENU_ITEM = "RECEIVE_MENU_ITEM"
export const RECEIVE_MENU_ITEM_ERRORS = "RECEIVE_MENU_ITEM_ERRORS"

const receiveMenuItemsAction = menuItems => ({
    type: RECEIVE_MENU_ITEMS,
    menuItems
})

const receiveMenuItemAction = menuItem => ({
    type: RECEIVE_MENU_ITEM,
    menuItem
})

const receiveMenuItemErrorsAction = errors => ({
    type: RECEIVE_MENU_ITEM_ERRORS,
    errors
})

export const fetchMenuItemsActionCreator = () => (dispatch) => {
    const promise = APIUTIL.fetchMenuItems()
    return promise.then(menu_items => dispatch(receiveMenuItemsAction(menu_items)),
        error => {
            return dispatch(receiveMenuItemErrors(error.responseJSON))
        })
}