import React, {PureComponent} from 'react'
import classNames from 'classnames'

import LoginButton from 'parts/LoginButton'

export default class LoginForm extends PureComponent {

  constructor(props) {
    super(props)
  }

  static propTypes = {
    callback: React.PropTypes.func
  }

  render() {
    return (
      <div className="tabs-content">
        <div className="form-group">
          <label>Thank you for trying ClubHub. Please log in with Google to save your club site</label>
        </div>
        <LoginButton className={classNames('btn', 'btn-primary', 'btn-block')} callback={this.props.callback} />
      </div>
    )
  }
}
