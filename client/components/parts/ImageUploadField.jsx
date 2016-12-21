import React, {Component, PropTypes} from 'react'

export default class ImageUploadField extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    updateImage: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string
  }

  handleChange = (e) => {
    this.props.updateImage(e.target.value)
  }

  render() {
    return (
      <div className="image-upload-field">
        <label className="form-label">{this.props.label}</label>
        <input className="form-input" type="url" placeholder={this.props.placeholder} onChange={this.handleChange} />
      </div>
    )
  }
}
