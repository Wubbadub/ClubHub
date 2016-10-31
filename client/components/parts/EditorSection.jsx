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
    setActive: PropTypes.func
  }

  toggleActive = () => {
    this.props.setActive(this.props.section)
  }

  render(){
    return (
      <div className="accordion-section">
        <button type="button" className="btn btn-link btn-block" onClick={this.toggleActive}>{this.props.section}</button>
        <form className="form-group" >
          <div className={`${this.props.active? '' : 'hide'} menu`} >
            <ShortTextInput className="menu-item" name="Name" />
            <LongTextInput className="menu-item" name="Description" />
          </div>
        </form>
      </div>
    )
  }
}
