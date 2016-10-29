import React, {PureComponent, PropTypes} from 'react'
import ShortTextInput from 'parts/ShortTextInput'
import LongTextInput from 'parts/LongTextInput'

export default class EditorSection extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      showSection: true
    }
  }

  static propTypes = {
    section: PropTypes.string,
    close: PropTypes.func
  }

  toggleShowSection = () => {
    this.setState({showSection: !this.state.showSection})
  }

  render(){
    return (
      <form className="form-group" >
        <label onClick={this.toggleShowSection} htmlFor={this.props.section}><b>{this.props.section}</b></label>
        <div className={`${this.state.showSection? '' : 'hide'} menu`} >
          <ShortTextInput className="menu-item" name="Name" />
          <LongTextInput className="menu-item" name="Description" />
        </div>
      </form>
    )
  }
}
