import React from "react";
import { connect } from "react-redux";
import { deleteLikedItemActionCreator } from "../../actions/menu_items_actions"

class ChosenItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hidden: false
        }
    }

    handleDelete(e, item_id) {
        e.preventDefault()
        this.props.deleteLikedItem(item_id)
        this.setState({hidden: true})
    }

    render() {
        const { key, item } = this.props
        const hidden_class = this.state.hidden ? " hidden" : ""
        return (
            <div className="chosen-item" key={key} style={{visibility: this.state.hidden ? 'hidden' : 'visible' }} >
                {item.name}
                <div className="chosen-item-delete" onClick={(e) => this.handleDelete(e, item.id)}>X</div>
            </div>
        )
    }
}

const msp = state => ({

})
const mdp = dispatch => ({
    deleteLikedItem: (item_id) => dispatch(deleteLikedItemActionCreator(item_id))
})

export default connect(msp, mdp)(ChosenItem)