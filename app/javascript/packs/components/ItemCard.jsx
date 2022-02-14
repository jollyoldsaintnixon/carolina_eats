import React from "react";
import ServeDate from "./ServeDate";
import { connect } from 'react-redux'
import {fetchMenuItemActionCreator} from "../actions/menu_items_actions"

class ItemCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDetails: false,
            serve_dates: []
        }
    }

    handleClick() {
        this.toggleDetails()
        this.handleHover()
    }

    handleHover() {
        this.props.fetchMenuItem(this.props.item.id)
            .then(action => {
                debugger
                const { menu_item } = action
                const { serve_dates } = menu_item
                this.setState({serve_dates})
                })
    }

    toggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails,
        })
    } 

    makeServeDates() {
        const dateSorter = (sd1, sd2) => {
            const sd1_start = sd1.start_time
            const sd2_start = sd2.start_time
            for (let i=0,len=sd1_start.length;i<len;i++){
                if (sd1_start[i]!=sd2_start[i]) return sd1_start[i]<sd2_start[i] ? -1 : 1;
            }
            return 0;
        }
        const serve_dates = this.state.serve_dates.sort().map((serve_date, idx) =>{ 
            const start_time = new Date(serve_date.start_time)
            return <ServeDate 
                location={serve_date.location} 
                time={start_time.getHours() + ":" + start_time.getMinutes()} 
                day={start_time.getDay()} 
                date={start_time.getDate()} 
                month={start_time.getMonth()}/>
        })
        return serve_dates
    }

    render() {
        const {name} = this.props.item
        const hiddenClass = this.state.showDetails ? "" : " hidden"
        const serve_dates = this.props.userSavedItem ? this.makeServeDates() : <div className="hidden"></div>
        return (
            <div className="item-card-div">
                <div className="clickable item-card-name" 
                onClick={e => this.handleClick(e)}
                onFocus={e => this.handleHover()}
                onFocusCapture={() => this.handleHover()}
                onBlur={() => this.handleHover()}
                onBlurCapture={() => this.handleHover()}
                 >{name}</div>
                <div className={"item-card-break-line" + hiddenClass}></div>
                <div className={hiddenClass}>
                    {serve_dates}
                </div>
                <div className={"item-card-description" + hiddenClass}>it's cheesy and good</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});
    
const mapDispatchToProps = dispatch => ({
    fetchMenuItem: (id) => dispatch(fetchMenuItemActionCreator(id))
});
    
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemCard);