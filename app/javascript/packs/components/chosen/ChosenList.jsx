import React from "react";
import { fetchLikedMenuItemsActionCreator } from "../../actions/menu_items_actions";
import { connect } from "react-redux"
import ChosenItem from "./ChosenItem";

class ChosenList extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { current_user } = this.props
        if (current_user) {
            this.props.fetchLikedMenuItems()
             
        }
    }

    componentDidUpdate(prev_props, prev_state) {
        if (JSON.stringify(prev_props.current_user) === 
            JSON.stringify(this.props.current_user)) {
                return
            }
        const { current_user } = this.props
        if (current_user) {
            this.props.fetchLikedMenuItems()
        }
    }

    makeLikedMenuItems() {
        const { liked_menu_items } = this.props
        if (!liked_menu_items) return
        return Object.values(liked_menu_items).map((item, idx) => {
            return (
                <ChosenItem item={item} key={idx} />
            )
        })
    }

    render() {
        console.log("this.props: ", this.props)
        const liked_menu_items = this.makeLikedMenuItems()
        return (
            <div className="chosen-list">
                {liked_menu_items}
            </div>
        )
    }
}

// const msp = (state) => {
const msp = ({ session: { id }, 
        entities: 
            { users, 
            menu_items: { liked_menu_items } } }) => {
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