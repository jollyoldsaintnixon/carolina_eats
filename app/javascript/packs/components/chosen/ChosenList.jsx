import React from "react";
import { fetchLikedMenuItemsActionCreator } from "../../actions/menu_items_actions";
import { connect } from "react-redux"
import ChosenItem from "./ChosenItem";
import { cloneDeep } from 'lodash'

class ChosenList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // recently_added: [] //for items that were added in this session. array format to keep order of addition
            recently_added: new Map() //for items that were added in this session. Map keeps track of insertion order. structure -> { id: item }
        }
    }

    componentDidMount() {
        // const { current_user } = this.props
        // if (current_user) {
            this.props.fetchLikedMenuItems()         
        // }
    }

    componentDidUpdate(prev_props, prev_state) {
        // check if user has changed. Could refactor to compare id, but have to handle the cases wehre one or both don't have current user.
        if (JSON.stringify(prev_props.current_user) !== 
            JSON.stringify(this.props.current_user)) {
                this.props.fetchLikedMenuItems()
            }
            console.log("in chosenList componentDidUpdate and current_user is:", this.props.current_user)
        // put items added this session into state
        // if (prev_props.liked_menu_items) {
        //     // filter out what was already there
        //     const added_this_session = Object.values(this.props.liked_menu_items)
        //         .filter(item => !(item.id in prev_props.liked_menu_items))
        //     console.log("added_this_session:", added_this_session)
        //     if (added_this_session.length) {
        //         const plus_last_session = cloneDeep(this.state.recently_added)
        //         for (let added in added_this_session) plus_last_session.set(added.id, added)
        //         this.setState({ recently_added: plus_last_session})
        //     }
        // }
    }

    makeLikedMenuItems() {
        const { liked_menu_items } = this.props
        // const { recently_added } = this.state
        if (!liked_menu_items) return

        // const already_had = Object.values(liked_menu_items)
        //     .filter(item => !(item.id in recently_added))
        // debugger
        // let key_counter = 0
        // const chosen_item_list = already_had
        //         .sort((a, b) => a.updated_at - b.updated_at) // sorts alphabetically
        //         .map((item, idx) => {
        //     return (
        //         <ChosenItem item={item} key={key_counter++} />
        //     )
        // })
        // for (let [id, item] of recently_added) {
        //     chosen_item_list.push(
        //         <ChosenItem item={item} key={key_counter++} />
        //     )
        // }
        // return chosen_item_list
        const s = Object.values(liked_menu_items)
        .sort((a, b) => Date.parse(a.updated_at) - Date.parse(b.updated_at))
        console.log(s)
        console.log("updated ats:")
        for (let i in s) console.log(s[i].updated_at)
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

// const msp = (state) => {
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