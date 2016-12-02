import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class ImageUploadField extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    updateImage: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string,
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
      <div className={classNames({'hidden': !this.props.isActive})} id="imageUpload">
        <label className={classNames('form-label')}>{this.props.label}</label>
        <input className={classNames('form-input')}
               type="url"
               placeholder={this.props.placeholder}
               onChange={this.handleChange} />
      </div>
    )
  }
}
