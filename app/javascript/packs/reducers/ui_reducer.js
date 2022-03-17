import { ESCAPE_SIGNAL } from "../actions/ui_actions"
import { cloneDeep } from 'lodash'

export default (state = new Set(), action) => {
    Object.freeze(state)
    const clone = cloneDeep(state)
    switch (action.type) {
        case ESCAPE_SIGNAL:
            console.log("reducer go the escape signal")
            return clone.add(ESCAPE_SIGNAL)
        default:
            return state
    }
}