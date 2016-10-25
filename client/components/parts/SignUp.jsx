import React, {PureComponent} from 'react'
import { Link } from 'react-router'

// use when state and lifecycle functions are needed
export default class SignUp extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      valid: false
    }
  }

  static propTypes = {
    active: React.PropTypes.bool,
    close: React.PropTypes.function
  }

  static defaultProps = {
    active: false
  }

  render() {

    return (
      <section>
        <div className={`modal modal-sm ${this.props.active ? ' active' : ''}`}>
          <div className="modal-overlay"></div>
          <div className="modal-container">
            <div className="modal-header">
              <button className="btn btn-clear float-right" onClick={this.props.close}></button>
              <h3 className="modal-title">Sign Up for ClubHub</h3>
            </div>
            <div className="modal-body">
              <div className="content">
                <p>Hello!</p>
              </div>
            </div>
            <div className="modal-footer">
              <Link className="btn btn-primary" to="/editor">Create Site</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
