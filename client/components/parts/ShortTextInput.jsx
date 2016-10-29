import React, {PureComponent, PropTypes} from 'react'

export default class ShortTextInput extends PureComponent{
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
        <input className="form-input" type="text" placeholder={this.props.name}></input>
      </div>
    )
  }
}
