// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import {configureStore} from './store/store'


import Root from './Root'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore()
  
  ReactDOM.render(
    <Root store={store}></Root>,
    document.body.appendChild(document.createElement('div')),
  )
})
