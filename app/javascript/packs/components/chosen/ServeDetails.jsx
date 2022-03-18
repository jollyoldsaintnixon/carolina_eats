import React from "react";

export default class ServeDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { item, display } = this.props
        return (
            <div className="serve-details" style={{display: display}}>
                serve details
            </div>
        )
    }
}