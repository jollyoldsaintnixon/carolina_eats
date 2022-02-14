import { combineReducers } from 'redux';
import menuItemsReducer from './menu_items_reducer';

const entitiesReducer = combineReducers({
  menuItems: menuItemsReducer,
});

export default entitiesReducer;