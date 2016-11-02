import React, {Component, PropTypes} from 'react'

export default class ButtonField extends Component{
  constructor(props){
    super(props)
  }

  buttonTypes = () => {
    return [
      'link',
      'email',
      'facebook',
      'twitter'
    ]
  }

  static propTypes = () => {
    return {
      label: PropTypes.string,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired,
      index: PropTypes.string,
      value: PropTypes.shape({
        type: PropTypes.oneOf(this.buttonTypes()),
        text: PropTypes.string,
        href: PropTypes.string
      }).isRequired,
      onChange: PropTypes.func.isRequired
    }
  }

  static defaultProps = {
    index: null
  }

  handleChange = (e) => {
    const kind = e.target.dataset.kind
    const val = this.props.value
    val[kind] = e.target.value
    this.props.onChange(this.props.name, val, this.props.index)
  }


  render(){
    return (
      <div className="form-group">
        <label className="form-label">{this.props.label}</label>
        <div className="form-border">
          <div className="form-group">
            <select className="form-select text-capitalize" data-kind="type" onChange={this.handleChange} value={this.props.value.type}>
              {this.buttonTypes().map((t) => {
                return (
                  <option key={t} value={t}>{t}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Label</label>
            <input className="form-input" type="text" data-kind="text" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.props.value.text} />
          </div>
          <div className="form-group">
            <label className="form-label">Link</label>
            <input className="form-input" type="text" data-kind="href" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.props.value.href} />
          </div>
        </div>
      </div>
    )
  }
}
