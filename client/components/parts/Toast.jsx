import React, {PureComponent, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from 'parts/Icon'

export default class Toast extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string.isRequired
  }

  dismiss = () => {

  }

  render() {
    return (
      <div className={classNames('toast',
          this.props.type ? `toast-${this.props.type}` : '')}
        onClick=dismiss>
        <Icon icon={this.props.icon} />
        {this.props.text}
      </div>
    )
  }
}
