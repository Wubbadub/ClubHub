import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class ImageUploadField extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    updateImage: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    isActive: PropTypes.bool
  }

  static defaultProps = {
    isActive: true
  }

  handleChange = (e) => {
    this.props.updateImage(e.target.value)
  }

  render() {
    return (
      <div id="imageUpload">
        <input className={classNames('form-input', {'hidden': !this.props.isActive})}
               type="url"
               placeholder={this.props.placeholder}
               onChange={this.handleChange} />
      </div>
    )
  }
}
