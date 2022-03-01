import React from "react";
import { connect } from "react-redux";
import NameSearch from "../search/NameSearch";
import LogOut from "./LogOut";
import NoUser from "./NoUser";

class SessionBar extends React.Component{
    constructor(props) {
        super(props)

    }

    displaySession() {
        const { current_user } = this.props
        if (current_user) {
            return (
                <>
                    <LogOut />
                </>
            )
        } else {
            return (
                <NoUser />
            )
        }
    }

    render() {
        console.log(this.props.errors)
        return (
            <div className="session-bar">
                {this.displaySession()}
            </div>
        )
    }

}

const msp = ({ session: { id }, entities: { users }, errors: session }) => ({
    current_user: users[id],
    errors: session
})

export default connect(msp)(SessionBar)