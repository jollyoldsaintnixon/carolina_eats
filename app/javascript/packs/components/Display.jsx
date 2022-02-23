import React from "react";
import { connect } from "react-redux";
import { fetchServeDatesActionCreator } from "../actions/menu_items_actions";
import ItemCard from "./ItemCard";

class Display extends React.Component {
    constructor(props) {
        super(props)
        // props: date, items being served that day, type of display (big or small)
        this.state = {
            filtered_menu_items: [],
            serve_dates: []
        }
    }

    filterMenuItems() {
        console.time("frontend")
        const { menu_items } = this.props
        const filtered_menu_items = Object.values(menu_items).map(menu_item => {
            const item_date = new Date(menu_item.start_date)
            return item_date.toLocaleDateString() == this.props.date.toLocaleDateString()
        })
        console.timeEnd("frontend")
        return filtered_menu_items
    }

    makeItemCards() {
        const { filtered_menu_items } = this.state
        if (filtered_menu_items.length) {
            return filtered_menu_items.map((item, idx) => <ItemCard
                item={item} 
                userSavedItem={"true"}
                key={idx}
            />)
        } else {
            return []
        }
    }

    componentDidMount() {
        this.props.fetchServeDates(0)
            .then(({serve_dates}) => {
                console.log(serve_dates)
                this.setState({
                serve_dates
            })})
        // const filtered_menu_items = this.filterMenuItems()
        // this.setState({filtered_menu_items})
    }

    render() {
        const item_cards = this.makeItemCards()
        return (
            <div className={`display ${this.props.type}`}>
                {item_cards}
                displaydisplaydisplaydisplaydisplaydisplaydisplaydisplaydisplay
            </div>
        )
    }
}

const msp = (state) => ({
    menu_items: state.entities.menu_items
})

const mdp = (dispatch) => ({
    fetchServeDates: (date) => dispatch(fetchServeDatesActionCreator(date))
})

export default connect(
    msp, mdp
)(Display)