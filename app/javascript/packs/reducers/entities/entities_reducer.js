import { combineReducers } from 'redux';
import menuItemsReducer from './menu_items_reducer';

const entitiesReducer = combineReducers({
  menu_items: menuItemsReducer,
});

export default entitiesReducer;