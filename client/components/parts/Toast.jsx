import React, {PureComponent, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from 'parts/Icon'

export default class Toast extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    timeout: PropTypes.number,
    pushActive: PropTypes.bool,
    class: PropTypes.string
  }

  componentDidMount() {
    if (this.props.pushActive) this.setState({active: true})
  }

  componentDidUpdate() {
    if (this.state.active && this.props.pushActive) {
      let timeoutTime = 0
      if (this.props.timeout) timeoutTime = this.props.timeout
      setTimeout(() => {
        this.setState({
          active: false
        })
      }, timeoutTime)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.active === false)
      if (nextProps.pushActive === true)
        this.setState({active: true})
  }

  dismiss = () => {
    this.setState({active: false})
  }

  render() {
    return (
      <div className={classNames('toast',
                                 this.props.class ? this.props.class : '',
                                 this.props.type ? `toast-${this.props.type}` : '',
                                 this.state.active ? 'visible': '')}
           onClick={this.dismiss}>
        <span>{this.props.text}</span>
      </div>
    )
  }
}
