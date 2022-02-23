import { combineReducers } from 'redux';
import menuItemsReducer from './menu_items_reducer';
import serveDatesReducer from './serve_dates_reducer'
import usersReducer from './users_reducer'

const entitiesReducer = combineReducers({
  menu_items: menuItemsReducer,
  serve_dates: serveDatesReducer,
  users: usersReducer,
});

export default entitiesReducer;