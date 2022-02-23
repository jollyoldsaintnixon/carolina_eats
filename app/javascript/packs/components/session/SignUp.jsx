import React from 'react'
import { connect } from "react-redux";
import { signUpActionCreator } from '../../actions/session_actions'
import { updateInput } from '../../helper'

class SignUp extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            email: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        // Password length validation and email validations can be performed here...
        // const { password, confirm_password } = this.state
        // if (this.signup && password != confirm_password) {
        //   this.props.receiveErrors(["Password must match"])
        //   this.props.history.push('/signup')
        // } else {
        // const { email } = this.state
        // if (!validateEmail(email)) {
        //   this.props.receiveErrors(["Invalid Email"])
        //   this.props.history.push('/signup')
        // } else {
        
        const user = this.state // the user object is essentially the whole state. the action will normalize it to { user: (user) }
        this.props.signUpUser(user)
        // }
    }

    makeErrorList(errors) {
        // console.log(errors)
    }

    componentDidUpdate() {
        // console.log("updated")
        // console.log("session id: ", this.props.currentUserId)
    }

    render() {
        const { email, password } = this.state
        // const errorList = this.makeErrorList(this.props.errors)
        return (
        <div className='sign-up-div session-div'>
            <form className='sign-up-form session-form' onSubmit={this.handleSubmit}>
                <div className='sign-up-header session-header'>Sign Up</div>
                <div className='session-lede'>Create a free account</div>
                <div className='session-inputs'>
                    <label>
                        <input type="email" placeholder='Email' value={email} onChange={updateInput('email', this)}/>
                    </label>
                    <label>
                        <input type="password" placeholder='Password' value={password} onChange={updateInput('password', this)}/>
                    </label>
                </div>
                <div className='session-submit-div'>
                    <input type="submit" value="Sign Up!" />
                </div>
            </form>
        </div>
        )
    }
}

const msp = (state) => {
    return ({ 
        errors: state.errors.sessionErrors,
        currentUserId: state.session.id
    })
}

const mdp = (dispatch) => ({
    signUpUser: user => dispatch(signUpActionCreator(user))
})

export default connect(
    msp, mdp
)(SignUp)