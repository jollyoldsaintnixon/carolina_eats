import React from "react";
import { connect } from "react-redux";

class Display extends React.Component {
    constructor(props) {
        super(props)
        // props: name of day, items being served that day, type of display (big or small)
    }

    render() {
        return (
            <div className={`display ${this.props.type}`}>

            </div>
        )
    }
}

const msp = (state) => ({
    menu_items: state.entities.menu_items
})

const mdp = (dispatch) => ({

})

export default connect(
    msp, mdp
)(Display)