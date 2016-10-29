import React, {PureComponent, PropTypes} from 'react'

export default class LongTextInput extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    name: PropTypes.string
  }

  render(){
    return (
      <div>
        <label className="form-label">{this.props.name}</label>
        <textarea className="form-input" type="text" placeholder={this.props.name}></textarea>
      </div>
    )
  }
}
