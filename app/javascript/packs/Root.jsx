import React from "react";
import { Provider } from "react-redux";
import App from "./components/App"
import { connect } from 'react-redux'
import { sendEscapeSignalActionCreator } from "./actions/ui_actions";

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleOnKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleOnKeyDown)
  }

  handleOnKeyDown(e) {
      if (e.key === "Escape") {
          console.log(e.key)
          this.props.sendEscapeSignal()
        }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    )
  }
}

const msp = state => ({})

const mdp = dispatch => ({
  sendEscapeSignal: () => dispatch(sendEscapeSignalActionCreator()),
})

export default connect(msp, mdp)(Root);