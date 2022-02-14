import {combineReducers} from 'redux'
import menuItemsErrorsReducer from './menu_items_errors_reducer'

export default combineReducers({
    menuItemErrors: menuItemsErrorsReducer,
})