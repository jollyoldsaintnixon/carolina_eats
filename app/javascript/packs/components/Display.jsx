import React from "react";
import ChosenList from "./chosen/ChosenList";
import NameSearch from "./search/NameSearch";

export default class Display extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="display-div">
                <ChosenList />
                <NameSearch />
            </div>
        )
    }
}