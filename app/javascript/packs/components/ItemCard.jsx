import React from "react";
import ServeDate from "./ServeDate";
import { fetchMenuItems } from "../util/menu_items_util";

export default class ItemCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false,
            menu_items: null,
        }
    }

    toggleDetails(e) {
        this.setState({
            showDetails: !this.state.showDetails,
        })
    } 

    componentDidMount() {
        const promise = fetchMenuItems()
        promise.then(menu_items => console.log(menu_items))
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