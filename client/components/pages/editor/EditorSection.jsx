import React, {PureComponent, PropTypes} from 'react'
import classNames from 'classnames'

import ShortTextInput from 'parts/ShortTextInput'
import LongTextInput from 'parts/LongTextInput'

export default class EditorSection extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    section: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.bool,
    setActive: PropTypes.func
  }

  toggleActive = () => {
    this.props.setActive(this.props.section)
  }

  render(){
    return (
      <div className={classNames('accordion-section', {'active': this.props.active})}>
        <h5 className="accordion-header" onClick={this.toggleActive}>{this.props.title}</h5>
        <div className="accordion-content">
          <div>
            <form>
              <div className="form-group">
                <ShortTextInput className="menu-item" name="Name" />
              <div className="form-group">
              </div>
                <LongTextInput className="menu-item" name="Description" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
