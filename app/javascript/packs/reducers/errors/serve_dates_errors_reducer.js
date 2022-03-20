import { RECEIVE_SERVE_DATES_ERRORS } from "../../actions/serve_date_actions";

export default (state = [], action) => {
    Object.freeze(state)

    switch (action.type) {
        case RECEIVE_SERVE_DATES_ERRORS:
            return [].push(action.errors)
        default:
            return state
    }
}