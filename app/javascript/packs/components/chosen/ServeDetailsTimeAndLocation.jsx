import React from "react";
import { formatTime, formatDay } from "../../helper";

export default class ServeDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    makeSpiel() {
        const { time, location } = this.props
        return`${formatTime(time)} on ${formatDay(time)} (${location})`
    }

    render() {
        return (
            <div className="serve-details-time-location">
                {this.makeSpiel()}
            </div>
        )
    }
}