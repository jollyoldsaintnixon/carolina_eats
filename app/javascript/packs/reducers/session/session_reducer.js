import { LOG_OUT, RECEIVE_CURRENT_USER } from "../../actions/session_actions"

const no_user = { id: null }

export default (state = no_user, action) => {
    Object.freeze(state)
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return { id: action.user.id }
        case LOG_OUT:
            return no_user
        default:
            return state
    }
}