import React, {PureComponent, PropTypes} from 'react'

export default class ButtonField extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.shape({
      type: PropTypes.oneOf(['link', 'email', 'facebook', 'twitter']),
      text: PropTypes.string,
      href: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange = (/*e*/) => {
    // Todo: This should update button values
    // const val = e.target.value
    // this.props.onChange(this.props.name, val)
  }

  static defaultProps = {
  }

  render(){
    return (
      <div className="form-group">
        <label className="form-label">{this.props.label}</label>
        <div className="form-group">
          <label className="form-label">Link URL</label>
          <input className="form-input" type="text" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.props.value.href}/>
        </div>
      </div>
    )
  }
}
