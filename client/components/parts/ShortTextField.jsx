import React, {PureComponent, PropTypes} from 'react'

export default class ShortTextField extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    const val = e.target.value
    this.props.onChange(this.props.name, val)
  }

  static defaultProps = {
  }

  render(){
    return (
      <div className="form-group">
        <label className="form-label">{this.props.label}</label>
        <input className="form-input" type="text" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.props.value}/>
      </div>
    )
  }
}
