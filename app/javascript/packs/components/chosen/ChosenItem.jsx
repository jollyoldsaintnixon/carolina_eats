import React from "react";
import { connect } from "react-redux";
import { deleteLikedItemActionCreator } from "../../actions/menu_items_actions"

class ChosenItem extends React.Component {
    constructor(props) {
        super(props)
    }

    handleDelete(e, item_id) {
        e.preventDefault()
        this.props.deleteLikedItem(item_id)
    }

    render() {
        const { key, item } = this.props
        return (
            <div className="chosen-item" key={key}>
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