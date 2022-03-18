import React from "react";
import { connect } from "react-redux";
import { deleteLikedItemActionCreator } from "../../actions/menu_items_actions"
import ServeDetails from "./ServeDetails";

class ChosenItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none"
        }
        this.handleReveal = this.handleReveal.bind(this)
    }

    handleDelete(e, item_id) {
        e.preventDefault()
        // noDisplay(e.target.parentElement)
        // this.setState({hidden: true})
        this.props.deleteLikedItem(item_id)
    }

    handleReveal() {
        this.setState({display: this.state.display == "none" ? "inherit" : "none"})
    }

    render() {
        const { item } = this.props
        return (
            <div className="chosen-item" >
                <div className="chosen-item-name-and-buttons">
                    {item.name}
                    <div className="chosen-item-buttons">
                        <div className="chosen-item-delete" 
                            onMouseDown={(e) => this.handleDelete(e, item.id)}
                        >X</div>
                        <div className="chosen-item-reveal"
                            onMouseDown={this.handleReveal}
                        >O</div>
                    </div>
                </div>
                <ServeDetails item={item} display={this.state.display}/>
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