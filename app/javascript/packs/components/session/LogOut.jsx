import React from 'react'
import { connect } from 'react-redux'
import { logOutActionCreator } from '../../actions/session_actions'


class LogOut extends React.Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        const user = this.state // the user object is essentially the whole state. the action will normalize it to { user: (user) }
        this.props.logOutUser(user)
        // }
    }

    render() {
        return (
        <div className="log-out-div">
            {this.props.current_user.email}
            <div className='log-out-button' onClick={this.handleSubmit}>Log Out</div>
        </div>
        )
    }
}

const msp = (state) => ({
    current_user: state.entities.users[state.session.id]
})

const mdp = dispatch => ({
    logOutUser: () => dispatch(logOutActionCreator())
})

export default connect(msp, mdp)(LogOut)