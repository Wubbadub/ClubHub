import React, {PureComponent, PropTypes} from 'react'
import GoogleLogin from 'react-google-login'
import Config from 'Config'
import cookie from 'react-cookie'
import classNames from 'classnames'

export default class LoginButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {loggedIn: false, profileObj: null}
  }

  static propTypes = {
    className: PropTypes.string
  }

  onLoginSuccess= (response) => {
    cookie.save('authorization', response.tokenId, {domain: Config.cookie_path[0], path: '/', maxAge: response.tokenObj.expires_in})
    this.setState({
      loggedIn: true,
      profileObj: response.profileObj
    })
  }

  onLoginFailure = () => {
    cookie.remove('authorization', {domain: Config.cookie_path[0], path: '/'})
    this.setState({
      loggedIn: false,
      profileObj: null
    })
  }


  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <button type="button" className={classNames(this.props.className)} onClick={this.onLoginFailure}>
            Logged In As {this.state.profileObj.name}
          </button>
        </div>
      )
    }
    return (
      <GoogleLogin className={classNames(this.props.className)}
                   clientId={Config.google_client_id}
                   buttonText="Sign In With Google"
                   onSuccess={this.onLoginSuccess}
                   onFailure={this.onLoginFailure}
      >
        <div>Log in</div>
      </GoogleLogin>
    )
  }
}
