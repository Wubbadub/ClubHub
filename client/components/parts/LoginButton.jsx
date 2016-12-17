// This component stores and retrieves all login information
// TODO: Replace localStorage usage with a more appropriate technique
import React, {PureComponent, PropTypes} from 'react'
import GoogleLogin from 'react-google-login'
import Config from 'Config'
import cookie from 'react-cookie'
import classNames from 'classnames'

export default class LoginButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {loginData: JSON.parse(localStorage.getItem('LoginButton'))}
    this.checkExpiry()
  }

  static propTypes = {
    className: PropTypes.string
  }

  // Check if the current auth data is expired and erase it if it is
  checkExpiry = () => {
    if (this.state.loginData && this.state.loginData.tokenObj.expires_at < new Date().getTime()) {
      this.setState({loginData: null})
      localStorage.removeItem('LoginButton')
      cookie.remove('authorization')
    }
  }

  onLoginSuccess = (response) => {
    cookie.save('authorization', response.tokenId, {maxAge: response.tokenObj.expires_in})
    this.setState({
      loginData: response
    })
    localStorage.setItem('LoginButton', JSON.stringify(response))
  }

  onLoginFailure = () => {
    this.setState({loginData: null})
    localStorage.removeItem('LoginButton')
    cookie.remove('authorization')
  }

  render() {
    this.checkExpiry()
    if (this.state.loginData) {
      return (
        <div>
          <button type="button" className={classNames(this.props.className)} onClick={this.onLoginFailure}>
            Logged in as {this.state.loginData.profileObj.name}
          </button>
        </div>
      )
    }
    return (
      <GoogleLogin className={classNames(this.props.className)}
                   clientId={Config.google_client_id}
                   onSuccess={this.onLoginSuccess}
                   onFailure={this.onLoginFailure}
      >
        <div>Log in</div>
      </GoogleLogin>
    )
  }
}
