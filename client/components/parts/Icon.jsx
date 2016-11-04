import React, {PureComponent, PropTypes} from 'react'
import classNames from 'classnames'

export default class Icon extends PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    size: PropTypes.number
  }

  static defaultProps = {
    size: 1
  };

  render() {
    return (
      <i className={classNames('icon', `icon-${this.props.icon}`)} style={{fontSize: `${this.props.size}em`}} />
    )
  }
}
