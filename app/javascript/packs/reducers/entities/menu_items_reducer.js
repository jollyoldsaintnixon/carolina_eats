import { RECEIVE_MENU_ITEM, RECEIVE_MENU_ITEMS } from '../../actions/menu_items_actions'
// import { RECEIVE_GAME_COMMENT } from '../../actions/game_comments_actions'
import { merge } from 'lodash'

export default (state = {}, action) => {
  
  Object.freeze(state)
  
  switch (action.type) {
    case RECEIVE_MENU_ITEMS:
        return action.menu_items
    case RECEIVE_MENU_ITEM:
        return merge({}, state, {[action.menu_item.id]: action.menu_item})
    // case RECEIVE_GAMES:
    //   return action.games
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