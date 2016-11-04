import React, {PureComponent} from 'react'
import {Link} from 'react-router'

import SignUpForm from './SignUpForm'

// use when state and lifecycle functions are needed
export default class SignUp extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    active: React.PropTypes.bool,
    close: React.PropTypes.func
  }

  static defaultProps = {
    active: false
  }

  render() {

    return (
      <section className="signup">
        <div className={`modal modal-sm ${this.props.active ? ' active' : ''}`}>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <div className="modal-header">
              <button className="btn btn-clear float-right" onClick={this.props.close}></button>
              <h3 className="modal-title">Sign Up for ClubHub</h3>
            </div>
            <div className="modal-body">
              <SignUpForm />
            </div>
            <div className="modal-footer">
              <Link className="btn btn-primary" to="/editor/create">Create Site</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
