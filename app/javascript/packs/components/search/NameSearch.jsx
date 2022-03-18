import React from "react";
import MatchingNames from "./MatchingNames"
import { updateInput } from "../../helper";
import { fetchMenuItemNamesActionCreator } from '../../actions/menu_items_actions'
import { connect } from "react-redux";
import { CLOSE_LIST_UI_ACTION } from "../../actions/ui_actions";

class NameSearch extends React.Component {
    /* This component retrieves the full list of menu items, handles 
        search input, and feeds that search input and menu items to the matching
        names component. it also controls the matching names component's visibility
        by reacting to an escape key press via the store
    */
    constructor(props) {
        super(props)

        this.state = {
            search_text: "",
            menu_item_names: ["Loading..."], // [name, id]
            visible_list: false
        }
        this.makeVisible = this.makeVisible.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.fetchMenuItemNames()
            .then(({menu_item_names}) => this.setState({menu_item_names}))
    }

    componentDidUpdate() {
        if (this.state.visible_list && this.props.ui.has(CLOSE_LIST_UI_ACTION) ) {
            this.setState({ visible_list: false })
            this.props.closeList()
        }
    }

    makeVisible(e) {
        this.setState({ visible_list: true })
    }

    handleChange(e) {
        this.setState({ 
            visible_list: true,
            search_text: e.target.value
         })
    }

    render() {
        const { search_text, menu_item_names } = this.state
        return (
            <div className="name-search-div">
                <input type="text" 
                    placeholder="Enter your favorite food" 
                    onChange={this.handleChange}
                    onFocus={e => this.makeVisible(e)}
                    onClick={this.makeVisible}
                    />
                <MatchingNames 
                    visible_list={this.state.visible_list}
                    search_text={search_text} 
                    menu_item_names={menu_item_names} />
            </div>
        )
    }
}

const msp = ({ ui }) => ({
    ui
})

const mdp = dispatch => ({
    fetchMenuItemNames: () => dispatch(fetchMenuItemNamesActionCreator()),
    closeList: () => dispatch({ type: CLOSE_LIST_UI_ACTION })
})

export default connect(msp, mdp)(NameSearch)