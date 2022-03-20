import React from "react";
import ItemCard from "./ItemCard";
import { connect } from 'react-redux'
import { fetchMenuItemsActionCreator, fetchMenuItemNamesActionCreator } from "../actions/menu_items_actions"
import SessionBar from "./session/SessionBar";
import Display from "./Display";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        // this.props.fetchMenuItems()
    }

    render() {
        const today = Date.now()
        return (
            <div>
                <SessionBar current_user={this.props.current_user} />
                <Display />
            </div>
        )
    }
}

const mapStateToProps = ({ entities: { menu_items, users }, session: { id }, }) => ({
    menu_items,
    current_user: users[id]
});

const mapDispatchToProps = dispatch => ({
    fetchMenuItems: () => dispatch(fetchMenuItemsActionCreator()),
    // fetchMenuItemNames: () => dispatch(fetchMenuItemNamesActionCreator())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);