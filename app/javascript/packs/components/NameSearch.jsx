import React from "react";
import MatchingNames from "./MatchingNames"
import { updateInput } from "../helper";
import { fetchMenuItemNamesActionCreator } from '../actions/menu_items_actions'
import { connect } from "react-redux";

class NameSearch extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            search_text: "",
            menu_item_names: ["Loading..."]
        }
    }

    componentDidMount() {
        this.props.fetchMenuItemNames()
            .then(({menu_item_names}) => this.setState({menu_item_names}))
    }



    render() {
        console.log(this.state)
        const { search_text, menu_item_names } = this.state
        return (
            <div className="name-search-div">
                <input type="text" placeholder="Enter your favorite food" onChange={updateInput('search_text', this)} />
                <MatchingNames search_text={search_text} menu_item_names={menu_item_names} />
            </div>
        )
    }
}

const msp = state => ({

})

const mdp = dispatch => ({
    fetchMenuItemNames: () => dispatch(fetchMenuItemNamesActionCreator())
})

export default connect(msp, mdp)(NameSearch)