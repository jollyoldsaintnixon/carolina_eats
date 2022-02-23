import React from "react";
import ItemCard from "./ItemCard";
import { connect } from 'react-redux'
// import { fetchMenuItems } from "../util/menu_items_util";
import { fetchMenuItemsActionCreator, fetchMenuItemNamesActionCreator } from "../actions/menu_items_actions"
import Display from "./Display";
import SignUp from "./session/SignUp";
import LogIn from "./session/LogIn";
import LogOut from "./session/LogOut";
import NameSearch from "./NameSearch";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menu_items: this.props.menu_items,
            menu_item_names: ["Loading..."]
        }
    }

    componentDidMount() {
        // this.props.fetchMenuItemNames()
        //     .then(({menu_item_names}) => this.setState({menu_item_names}))
        //     .then(() => this.props.fetchMenuItems())
        //     .then(({menu_items}) => this.setState({menu_items}//, state => console.log(state)
        //     ))
        this.props.fetchMenuItems()
            .then(({menu_items}) => this.setState({menu_items}//, state => console.log(state)
            ))
    }

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
        // console.log(this.state)
        const today = Date.now()
        return (
            <div>
                {/* <ItemCard item={{name: "macaroni"}} userSavedItem={"true"}></ItemCard> */}
                {/* {menu_items} */}
                {/* <Display type="big" date={today}/> */}
                <SignUp />
                <br></br>
                <LogIn />
                <br></br>
                <LogOut />
                <NameSearch />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
menu_items: state.entities.menu_items,
// initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

const mapDispatchToProps = dispatch => ({
    fetchMenuItems: () => dispatch(fetchMenuItemsActionCreator()),
    fetchMenuItemNames: () => dispatch(fetchMenuItemNamesActionCreator())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);