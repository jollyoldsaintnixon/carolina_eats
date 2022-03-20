import React from "react";
import { connect } from "react-redux";
import { fetchMenuItemActionCreator } from "../../actions/menu_items_actions";
import ServeDetailsTimeAndLocation from "./ServeDetailsTimeAndLocation"

class ServeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reloaded: false
        }
    }

    componentDidMount() {
        const { item } = this.props
        if ((!item || !item.serve_dates) && !this.state.reloaded) {
            // this.props.fetchMenuItem(this.props.item.id)
            this.setState({reloaded: true})
        }
    }

    filterDates() {
        const { item } = this.props
        if (item && item.serve_dates) {
            const filtered = item.serve_dates.filter(sd => {
                const start_time = Date.parse(sd.start_time)
                const now = new Date()
                // const next_week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                return start_time > now
            })
            const sorted = filtered.sort((a, b) => {
                return Date.parse(a.start_time) - Date.parse(b.start_time)
            })
            return sorted
        }
        return []
    }

    makeNextDates() {
        if (this.props.item) {
            const filtered_and_sorted = this.filterDates()
            return filtered_and_sorted.map((sd, idx) => 
                <ServeDetailsTimeAndLocation
                    key={idx} 
                    time={sd.start_time} 
                    location={sd.location} /> )
        } 
    }

    render() {
        const { item, display } = this.props
        const next_dates = this.makeNextDates()
        return (
            <div className="serve-details" style={{display: display}}>
                {item.category}
                <div className="next-dates">
                    {next_dates}
                </div>
            </div>
        )
    }
}

const msp = dispatch => ({})
const mdp = dispatch => ({
    // fetchMenuItem: (id) => dispatch(fetchMenuItemActionCreator(id))
})

export default connect(msp, mdp)(ServeDetails)