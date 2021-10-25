import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', canDisplayErrorMsg: false}

  loginFailure = text => {
    console.log(text)
    this.setState({errorMsg: text, canDisplayErrorMsg: true})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  submitForm = async event => {
    const {username, password} = this.state
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  handleInputs = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  UserNameInput = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-align">
          USERNAME
        </label>
        <input
          id="username"
          onChange={this.handleInputs}
          name="username"
          value={username}
          type="text"
          className="input-design-login"
          placeholder="Username"
        />
      </>
    )
  }

  PasswordInput = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label-align">
          PASSWORD
        </label>
        <input
          id="password"
          name="password"
          onChange={this.handleInputs}
          value={password}
          type="password"
          className="input-design-login"
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {errorMsg, canDisplayErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-container">
          <div className="Login-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo-design"
            />
            <form className="login-form-design" onSubmit={this.submitForm}>
              {this.UserNameInput()}

              {this.PasswordInput()}
              {canDisplayErrorMsg ? (
                <p className="error-highlighter">{errorMsg}</p>
              ) : null}
              <button type="submit" className="login-submit-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}
export default Login
