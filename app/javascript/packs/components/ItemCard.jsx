import React from "react";
import ServeDate from "./ServeDate";

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false,
        }
    }

    toggleDetails(e) {
        console.log(e.target)
        this.setState({
            showDetails: !this.state.showDetails,
        })
    }

    render() {
        const {name} = this.props.item
        const hiddenClass = this.state.showDetails ? "" : " hidden"
        const serveDate = this.props.userSavedItem ? <ServeDate location={"Chase"} time="3pm" date="next thurs"></ServeDate> : <div className="hidden"></div>
        return (
            <div className="item-card-div">
                <div className="clickable item-card-name" onClick={e => this.toggleDetails(e)} >{name}</div>
                <div className={"item-card-break-line" + hiddenClass}></div>
                <div className={hiddenClass}>
                    {serveDate}
                </div>
                <div className={"item-card-description" + hiddenClass}>it's cheesy and good</div>
            </div>
        )
    }
}