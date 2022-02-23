import { RECEIVE_MENU_ITEM,
  RECEIVE_MENU_ITEMS,
  RECEIVE_MENU_ITEM_NAMES,
  } from '../../actions/menu_items_actions'

import { merge } from 'lodash'

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
    // case RECEIVE_GAME:
    //   return merge({}, state, { [action.game.id]: action.game })
    // case RECEIVE_PAGE_OF_GAMES:
    //   return merge({}, state, action.games)
    // case RECEIVE_GAME_COMMENT:
    //   return merge({}, state, { [action.game.id]: action.game })
    default:
      return state;
  }
}