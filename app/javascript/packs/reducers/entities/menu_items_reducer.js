import { RECEIVE_LIKED_INDEX, 
  RECEIVE_MENU_ITEM,
  RECEIVE_MENU_ITEMS,
  RECEIVE_MENU_ITEM_NAMES,
  POST_LIKED_ITEM,
  DELETE_LIKED_ITEM
  } from '../../actions/menu_items_actions'

import { merge, cloneDeep } from 'lodash'

export default (state = {}, action) => {
  
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_MENU_ITEMS:
      return action.menu_items
    case RECEIVE_MENU_ITEM:
      return merge({}, state, {[action.menu_item.id]: action.menu_item})
    case RECEIVE_MENU_ITEM_NAMES:
      return merge({}, state, {
        menu_item_names: action.menu_item_names
      })
    case RECEIVE_LIKED_INDEX:
      return merge({}, state, { liked_menu_items: action.liked_menu_items })
    case POST_LIKED_ITEM:
      const added_liked_item = { liked_menu_items: 
          { [action.liked_item.id]: action.liked_item }
         }
      return merge({}, state, added_liked_item)
    case DELETE_LIKED_ITEM:
         const clone = cloneDeep(state)
         delete clone.liked_menu_items[action.item_id]
         return clone
    default:
      return state;
  }
}