import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import * as Sections from './sections'

export default class EditorSection extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    section: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object,
    setData: PropTypes.func,
    active: PropTypes.bool,
    setActive: PropTypes.func
  }

  toggleActive = () => {
    this.props.setActive(this.props.section)
  }

  render(){
    if (!Sections[this.props.section]) return null
    const Section = Sections[this.props.section]
    return (
      <div className={classNames('accordion-section', {'active': this.props.active})}>
        <h5 className="accordion-header" onClick={this.toggleActive}>{this.props.title}</h5>
        <div className="accordion-content">
          <div>
            <Section data={this.props.data} setData={this.props.setData}/>
          </div>
        </div>
      </div>
    )
  }
}
