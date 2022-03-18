import { ESCAPE_SIGNAL, CLOSE_LIST_UI_ACTION } from "../actions/ui_actions"
import { cloneDeep } from 'lodash'

export default (state = new Set(), action) => {
    Object.freeze(state)
    const clone = cloneDeep(state)
    switch (action.type) {
        case ESCAPE_SIGNAL:
            console.log("reducer go the escape signal")
            return clone.add(CLOSE_LIST_UI_ACTION)
        case CLOSE_LIST_UI_ACTION:
            clone.delete(CLOSE_LIST_UI_ACTION)
            return clone
        default:
            return state
    }
}