import React from "react";
import ItemCard from "./ItemCard";
import { connect } from 'react-redux'
// import { fetchMenuItems } from "../util/menu_items_util";
import { fetchMenuItemsActionCreator, fetchMenuItemNamesActionCreator } from "../actions/menu_items_actions"
import NameSearch from "./search/NameSearch";
import SessionBar from "./session/SessionBar";
import Display from "./Display";
// import { sendEscapeSignalActionCreator } from "../actions/ui_actions";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menu_items: this.props.menu_items,
            menu_item_names: ["Loading..."]
        }
        // this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
    }

    // componentDidMount() {
    //     document.addEventListener("keydown", this.handleOnKeyDown)
    // }

    // handleOnKeyDown(e) {
    //     if (e.key === "Escape") {
    //         console.log(e.key)
    //         this.props.sendEscapeSignal()
    //       }
    // }

    makeItemCards() {
        const { menu_items } = this.state
        if (menu_items) {
            return Object.keys(menu_items).map((id) => <ItemCard 
                item={menu_items[id]} 
                userSavedItem={"true"}
                key={id}
                />)
        } else {
            return []
        }
    }

    render() {
        // const menu_items = this.makeItemCards()
        const today = Date.now()
        return (
            <div>
                {/* <ItemCard item={{name: "macaroni"}} userSavedItem={"true"}></ItemCard> */}
                {/* {menu_items} */}
                <SessionBar current_user={this.props.current_user} />
                <Display />
                {/* <NameSearch /> */}
            </div>
        )
    }
}

const mapStateToProps = ({ entities: { menu_items, users }, session: { id }, }) => ({
// menu_items: state.entities.menu_items,
menu_items,
current_user: users[id]
// initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

const mapDispatchToProps = dispatch => ({
    // sendEscapeSignal: () => dispatch(sendEscapeSignalActionCreator()),
    fetchMenuItems: () => dispatch(fetchMenuItemsActionCreator()),
    fetchMenuItemNames: () => dispatch(fetchMenuItemNamesActionCreator())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);