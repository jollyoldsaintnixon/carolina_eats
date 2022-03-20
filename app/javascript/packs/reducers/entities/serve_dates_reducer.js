import { RECEIVE_SERVE_DATES } from '../../actions/serve_date_actions'
import { RECEIVE_MENU_ITEMS } from '../../actions/menu_items_actions'
import { merge } from 'lodash'

export default (state = {}, action) => {
  
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_MENU_ITEMS:
        let next_state = {}
        let start = Date.now()
        for (let k of Object.keys(action.menu_items)) {
          for (let sd of action.menu_items[k].serve_dates) {
            if (sd.start_time in next_state) {
              next_state[sd.start_time].push(action.menu_items[k].name)
            } else {
              next_state[sd.start_time] = [action.menu_items[k].name]
            }
          }
        }
        return merge({}, state, next_state)
    case RECEIVE_SERVE_DATES:
        console.log(action.serve_dates)
        return merge({}, state, action.serve_dates) // should be a object with a key of the date and value an array of things being served
    default:
      return state;
  }
}