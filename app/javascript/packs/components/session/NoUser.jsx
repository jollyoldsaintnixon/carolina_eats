import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default class NoUser extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="no-user-div">
                No User
                <SignUp />
                <LogIn />
            </div>
        )
    }
}