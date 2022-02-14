import * as APIUTIL from '../util/menu_items_util'

export const RECEIVE_MENU_ITEMS = "RECEIVE_MENU_ITEMS"
export const RECEIVE_MENU_ITEM = "RECEIVE_MENU_ITEM"
export const RECEIVE_MENU_ITEM_ERRORS = "RECEIVE_MENU_ITEM_ERRORS"

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

export const fetchMenuItemsActionCreator = () => (dispatch) => {
    const promise = APIUTIL.fetchMenuItems()
    return promise.then(menu_items => dispatch(receiveMenuItemsAction(menu_items)),
        error => {
            debugger
            return dispatch(receiveMenuItemErrors(error.responseJSON))
        })
}

// export const fetchMenuItems = () => {
//     return $.ajax({
//         method: 'GET',
//         url: '/api/menu_items'
//     })
// }

// export const fetchGames = () => dispatch => {
    
//     const promise = APIUtil.fetchGames()
//     return promise.then(games => dispatch(receiveGames(games)),
//     error => {      
//         return dispatch(receiveGameErrors(error.responseJSON))
//     })
// }

// export const fetchGames = () => {
//     return $.ajax({
//       method: 'GET',
//       url: '/api/games',
//     })
//   }
  
  

export const fetchMenuItemActionCreator = (id) => (dispatch) => {
    const promise = APIUTIL.fetchMenuItem(id)
    return promise.then(menu_item => {
        return dispatch(receiveMenuItemAction(menu_item))},
        (error) => {
            dispatch(receiveMenuItemErrorsAction(error.responseText))}
    )
}