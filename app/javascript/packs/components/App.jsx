import React from "react";
import ItemCard from "./ItemCard";
import { connect } from 'react-redux'
// import { fetchMenuItems } from "../util/menu_items_util";
import {fetchMenuItemsActionCreator} from "../actions/menu_items_actions"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menu_items: this.props.menu_items
        }
    }

    componentDidMount() {
        this.props.fetchMenuItems()
            .then(({menu_items}) => this.setState({menu_items}, state => console.log(state)))
    }

    makeItemCards() {
        const { menu_items } = this.state
        if (menu_items) {
            let i = 0 // TEST TEST i is only for testing; remove later
            return Object.keys(menu_items).map((id) => {
            if (i>4) {
                return
            }
            i++
            return <ItemCard item={menu_items[id]} userSavedItem={"true"}/>})
        } else {
            return []
        }
    }

    render() {
        const menu_items = this.makeItemCards()
        return (
            <div>
                {/* <ItemCard item={{name: "macaroni"}} userSavedItem={"true"}></ItemCard> */}
                {menu_items}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
menu_items: state.entities.menu_items,
// initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

const mapDispatchToProps = dispatch => ({
    fetchMenuItems: () => dispatch(fetchMenuItemsActionCreator())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);