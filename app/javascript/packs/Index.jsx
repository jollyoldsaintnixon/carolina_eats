// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ItemCard from './components/ItemCard'

const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

console.log("index body")

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    // <ServeDate location={"Lenoir"} time={"13:00"} date={"Tuesday, March 3"} />,
    <ItemCard item={{name: "macaroni"}} userSavedItem={"true"}></ItemCard>,
    document.body.appendChild(document.createElement('div')),
  )
})
