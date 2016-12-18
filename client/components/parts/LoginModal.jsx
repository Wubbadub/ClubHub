import React, {PureComponent} from 'react'

import LoginForm from './LoginForm'

export default class LoginModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    active: React.PropTypes.bool,
    close: React.PropTypes.func,
    callback: React.PropTypes.func
  }

  static defaultProps = {
    active: false
  }

  render() {

    return (
      <section className="login">
        <div className={`modal modal-sm ${this.props.active ? ' active' : ''}`}>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <div className="modal-body">
              <button className="btn btn-clear float-right" onClick={this.props.close}></button>
              <LoginForm callback={this.props.callback}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
