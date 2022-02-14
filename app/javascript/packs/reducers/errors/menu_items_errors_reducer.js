import { RECEIVE_MENU_ITEM_ERRORS } from "../../actions/menu_items_actions";

export default (state = [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_MENU_ITEM_ERRORS:
            return [].push(action.errors)
        default:
            return state
    }
}