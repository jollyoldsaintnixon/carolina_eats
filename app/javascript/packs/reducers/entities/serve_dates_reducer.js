import { RECEIVE_SERVE_DATES } from '../../actions/menu_items_actions'
// import { RECEIVE_GAME_COMMENT } from '../../actions/game_comments_actions'
import { merge } from 'lodash'

export default (state = {}, action) => {
  
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_SERVE_DATES:
        console.log(action.serve_dates)
        return merge({}, state, action.serve_dates) // should be a object with a key of the date and value of array of things being served
    default:
      return state;
  }
}