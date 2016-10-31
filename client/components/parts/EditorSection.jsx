import React, {PureComponent, PropTypes} from 'react'
import ShortTextInput from 'parts/ShortTextInput'
import LongTextInput from 'parts/LongTextInput'

export default class EditorSection extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    section: PropTypes.string,
    active: PropTypes.bool,
    toggleShowSection: PropTypes.func
  }

  render(){
    return (
      <form className="form-group" >
        <label onClick={this.props.toggleShowSection} htmlFor={this.props.section}><b>{this.props.section}</b></label>
        <div className={`${this.props.active? '' : 'hide'} menu`} >
          <ShortTextInput className="menu-item" name="Name" />
          <LongTextInput className="menu-item" name="Description" />
        </div>
      </form>
    )
  }
}
