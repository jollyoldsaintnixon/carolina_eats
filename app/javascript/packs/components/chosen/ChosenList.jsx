import React from "react";
import { fetchLikedMenuItemsActionCreator } from "../../actions/menu_items_actions";
import { connect } from "react-redux"
import ChosenItem from "./ChosenItem";
import { cloneDeep } from 'lodash'

class ChosenList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.props.fetchLikedMenuItems()         
    }

    componentDidUpdate(prev_props, prev_state) {
        // check if user has changed. Could refactor to compare id, but have to handle the cases wehre one or both don't have current user.
        if (JSON.stringify(prev_props.current_user) !== 
            JSON.stringify(this.props.current_user)) {
                this.props.fetchLikedMenuItems()
            }
    }

    makeLikedMenuItems() {
        const { liked_menu_items } = this.props
        if (!liked_menu_items) return

        const s = Object.values(liked_menu_items)
            .sort((a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at))

        return Object.values(liked_menu_items)
            .sort((a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at)) // sorts by date added
            .map((item, idx) => {
                return (
                    <ChosenItem item={item} key={idx} />
                )
        })
    }

    render() {
        const liked_menu_items = this.makeLikedMenuItems()
        return (
            <div className="chosen-list">
                {liked_menu_items}
            </div>
        )
    }
}

const msp = (
    { 
        session: { id }, 
        entities: 
            { 
                users, 
                menu_items: { liked_menu_items } 
            } 
    }) => {
    // debugger
    return ({
        liked_menu_items,
        current_user: users[id]
    })
}

const mdp = dispatch => ({
    fetchLikedMenuItems: () => dispatch(fetchLikedMenuItemsActionCreator())
})

export default connect(msp, mdp)(ChosenList)