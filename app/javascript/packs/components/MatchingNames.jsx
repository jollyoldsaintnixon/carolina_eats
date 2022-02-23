import { timers } from 'jquery'
import React from 'react'

export default class MatchingNames extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            dictionary: {}
        }
    }

    makeMatches() {
        const { search_text, menu_item_names } = this.props
        const { dictionary } = this.state
        if (search_text.length < 1) {
            return null
        }
        let filtered
        if (search_text in dictionary) {
            filtered = dictionary[search_text]
            console.log("in the dict")
        } else {
            filtered = this.filter(menu_item_names, search_text)
            dictionary[search_text] = filtered // memoize
        }
        
        return this.makeElements(filtered)
    }

    filter(menu_item_names, search_text) {
        const c = search_text[0]
        const filtered_hash = {}
        for (let item of menu_item_names) {
            const idx = item.toLowerCase().indexOf(c.toLowerCase())
            if (idx >= 0) {
                const sliced = item.slice(idx+1).toLowerCase()
                if (sliced.length >= search_text.length - 1) { // determine if it is long enough
                    filtered_hash[item] = {
                        sliced: sliced, 
                        space_between: 0, 
                        initial_idx: idx
                    } 
                }
            }
        }

        return this.recursiveFilter(filtered_hash, search_text.slice(1))
    }

    recursiveFilter(item_hash, str) {
        
        if (!str.length) {
            const sorted_keys = this.fancySort(item_hash)
            return sorted_keys
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
            onClick={() => console.log(item)}
            >{item}</div>)
        })
    }

    render() {
        let matches = this.makeMatches()
        matches = matches ? matches : null // in case it is undefined
        return (
            
            <div className='search-list'>
                {matches}
            </div>
        )
    }
}

