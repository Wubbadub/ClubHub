import React, {PureComponent, PropTypes} from 'react'
import classNames from 'classnames'

import LoginButton from 'parts/LoginButton'

export default class LoginModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    close: PropTypes.func,
    callback: PropTypes.func
  }

  static defaultProps = {
    active: false
  }

  render() {
    const {close, children, callback} = this.props
    return (
      <section className="login">
        <div className={`modal modal-sm ${this.props.active ? ' active' : ''}`}>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <div className="modal-body">
              <button className="btn btn-clear float-right" onClick={close}></button>
              <div>
                <div className="form-group">
                  <b>Log in to ClubHub</b>
                </div>
                <div className="form-group">
                  {children}
                </div>
                <LoginButton className={classNames('btn', 'btn-primary', 'btn-block')} callback={callback} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
