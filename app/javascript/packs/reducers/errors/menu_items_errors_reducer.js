import { 
    RECEIVE_LIKED_INDEX_ERRORS,
    RECEIVE_MENU_ITEM_ERRORS, 
    RECEIVE_MENU_ITEM_NAMES_ERRORS 
} from "../../actions/menu_items_actions";

export default (state = [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_MENU_ITEM_ERRORS:
            return action.errors
        case RECEIVE_MENU_ITEM_NAMES_ERRORS:
            return action.errors
        case RECEIVE_LIKED_INDEX_ERRORS:
            return action.errors
        default:
            return state
    }
}