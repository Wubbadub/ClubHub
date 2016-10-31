import React, {PureComponent, PropTypes} from 'react'

export default class LongTextInput extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    label: PropTypes.string
  }

  render(){
    return (
      <div className="form-group">
        <label className="form-label">{this.props.label}</label>
        <textarea className="form-input" type="text" placeholder={this.props.label}></textarea>
      </div>
    )
  }
}
