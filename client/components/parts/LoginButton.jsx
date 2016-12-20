// This component stores and retrieves all login information
// We store the timeout timer so that we can clear it if they log out and sign in again later without leaving the page
// TODO: Replace localStorage usage with a more appropriate technique
import React, {PureComponent, PropTypes} from 'react'
import GoogleLogin from 'react-google-login'
import Config from 'Config'
import cookie from 'react-cookie'
import classNames from 'classnames'

export default class LoginButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {loginData: JSON.parse(localStorage.getItem('LoginButton')), timeOut: null}
  }

  static propTypes = {
    className: PropTypes.string,
    callback: React.PropTypes.func
  }

  static defaultProps = {
    callback: () => {}
  }

  componentWillMount = () => {
    if (this.state.loginData) {
      if (this.state.loginData.tokenObj.expires_at < new Date().getTime()) {
        this.setState({loginData: null})
        localStorage.removeItem('LoginButton')
        cookie.remove('authorization')
      } else {
        this.setState({timeOut: setTimeout(this.onLoginFailure, Math.max(1, this.state.loginData.tokenObj.expires_at - new Date().getTime()))})
      }
    }
  }

  onLoginSuccess = (response) => {
    cookie.save('authorization', response.tokenId, {path: '/', maxAge: response.tokenObj.expires_in})
    this.setState({
      loginData: response
    })
    localStorage.setItem('LoginButton', JSON.stringify(response))
    this.setState({timeOut: setTimeout(this.onLoginFailure, Math.max(1, this.state.loginData.tokenObj.expires_at - new Date().getTime()))})
    this.props.callback(response)
  }

  onLoginFailure = () => {
    clearTimeout(this.state.timeOut)
    this.setState({loginData: null, timeOut: null})
    localStorage.removeItem('LoginButton')
    cookie.remove('authorization')
    this.props.callback(null)
  }

  render() {
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
        <div>Log in with Google</div>
      </GoogleLogin>
    )
  }
}
