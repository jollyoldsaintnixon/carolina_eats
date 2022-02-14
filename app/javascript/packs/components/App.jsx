import React from "react";
import ItemCard from "./ItemCard";
import { connect } from 'react-redux'
import { fetchMenuItems } from "../util/menu_items_util";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            menu_items: this.props.menu_items
        }
    }

    componentDidMount() {
        this.props.fetchMenuItems()
            .then((menu_items) => this.setState({menu_items}))
    }

    makeItemCards() {
        const { menu_items } = this.state
        debugger
        if (this.state.menu_items) {
            return Object.keys(menu_items).map((id) => <ItemCard item={menu_items[id]} userSavedItem={"true"}/>)
        } else {
            return []
        }
    }

    render() {
        const menu_items = this.makeItemCards()
        return (
            <div>
                <ItemCard item={{name: "macaroni"}} userSavedItem={"true"}></ItemCard>
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
    fetchMenuItems: () => dispatch(fetchMenuItems)
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);