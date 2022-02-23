import {combineReducers} from 'redux'
import menuItemsErrorsReducer from './menu_items_errors_reducer'
import serveDateErrorsReducer from './serve_dates_errors_reducer'
import sessionErrorsReducer from './session_errors_reducer'

export default combineReducers({
    menuItemErrors: menuItemsErrorsReducer,
    serveDateErrors: serveDateErrorsReducer,
    sessionErrors: sessionErrorsReducer,
})