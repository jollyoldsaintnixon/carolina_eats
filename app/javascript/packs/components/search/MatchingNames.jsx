import { timers } from 'jquery'
import React from 'react'
import { connect } from 'react-redux'
import { saveLikedItemActionCreator } from "../../actions/menu_items_actions"

class MatchingNames extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            dictionary: {}
        }
    }

    makeMatches() {
        const { search_text, menu_item_names } = this.props
        const dictionary = JSON.parse(JSON.stringify(this.state.dictionary))
        if (search_text.length < 1) {
            return null
        }
        let filtered
        if (search_text in dictionary) {
            filtered = dictionary[search_text]
        } else {
            filtered = this.filter_sort_renormalize(menu_item_names, search_text)
            dictionary[search_text] = filtered // memoize
        }
        
        return this.makeElements(filtered)
    }

    filter_sort_renormalize(menu_item_names, search_text) {
        const c = search_text[0]
        const filtered_hash = {}
        for (let item of menu_item_names) {
            const name = item[0] // that'ts how it's set up. a menu item name is [name, id]
            const idx = name.toLowerCase().indexOf(c.toLowerCase())
            if (idx >= 0) {
                const sliced = name.slice(idx+1).toLowerCase()
                if (sliced.length >= search_text.length - 1) { // determine if it is long enough
                    filtered_hash[name] = {
                        sliced: sliced, 
                        space_between: 0, 
                        initial_idx: idx,
                        id: item[1]
                    } 
                }
            }
        }

        return this.recursiveFilter(filtered_hash, search_text.slice(1))
    }

    recursiveFilter(item_hash, str) {
        
        if (!str.length) {
            const sorted_keys = this.fancySort(item_hash)
            const renormalized_keys = sorted_keys.map(k => [k, item_hash[k].id])
            return renormalized_keys
        }
        for (const [key, value] of Object.entries(item_hash)) {
            const c = str[0]
            const idx = value.sliced.indexOf(c.toLowerCase())
            if (idx >= 0) {
                const sliced = value.sliced.slice(idx+1)
                if (sliced.length >= str.length - 1) {
                    value.sliced = sliced
                    value.space_between += idx
                } else {
                    delete item_hash[key] // too short
                }
            } else {
                delete item_hash[key] // too short
            }
        }
        
        return this.recursiveFilter(item_hash, str.slice(1))
    }

    fancySort(item_hash) {
        const keys = Object.keys(item_hash).slice()
        keys.sort((a, b) => {
            let compactness = item_hash[a].space_between - item_hash[b].space_between
            if (compactness === 0) {
                return item_hash[a].initial_idx - item_hash[b].initial_idx
            } else {
                return compactness
            }
        })
        return keys
    }

    makeElements(filtered_list) {
        return filtered_list.map((item, idx) => {
            return (<div className='matched-name' 
            key={idx}
            onClick={(e) => this.handleClick(e, item[1])} // item[1] is id
            // >{[...this.highlightMatchingText(item[0], idx)]}</div>) // item[0] is name
            >{item[0]}</div>) // item[0] is name
        })
    }

    // this method is too slow as it stands, even when restricting it to first 10 items
    highlightMatchingText(item_name, idx) {
        if (idx < 10) {
            const { search_text } = this.props
            const span_list = []
            let last_idx = 0
            for (let c of item_name) {
                if (last_idx < search_text.length && c.toLowerCase() === search_text[last_idx].toLowerCase()) {
                    span_list.push(<span style={{ fontWeight: "bold" }}>{c}</span>)
                    last_idx++
                } else {
                    span_list.push(c)
                }
            }
            return span_list
        } else {
            return item_name
        }
    }

    handleClick(e, item_id) {
        e.preventDefault()
        this.props.saveLikedItem(item_id)
    }

    render() {
        let matches = this.makeMatches()
        matches = matches ? matches : null // in case it is undefined
        return (
            
            <div className='search-list'
                 style={{ display: this.props.visible_list ? "inherit" : "none"}}>
                {matches}
            </div>
        )
    }
}

const msp = state => ({})
const mdp = dispatch => (
    {
        saveLikedItem: (item_id) => dispatch(saveLikedItemActionCreator(item_id))
    }
)

export default connect(msp, mdp)(MatchingNames)