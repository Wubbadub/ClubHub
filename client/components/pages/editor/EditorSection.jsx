import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import * as Sections from './sections'

export default class EditorSection extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    section: PropTypes.string,
    data: PropTypes.object,
    setData: PropTypes.func,
    active: PropTypes.bool,
    toggleSection: PropTypes.func
  }

  toggleActive = () => {
    this.props.toggleSection(this.props.section)
  }

  addElement = (key, data, isObject) => {
    const newData = this.props.data
    if (isObject) newData[key] = data
    else newData.links.push(data)
    console.log(newData)
    this.props.setData(this.props.section, newData)
  }

  removeElement = (key, isObject) => {
    const newData = this.props.data
    if (isObject) delete newData[key]
    else {
      let index = this.props.data.links.indexOf(key)
      if (index > -1) this.props.data.links.splice(index, 1)
    }
    console.log(newData)
    this.props.setData(this.props.section, newData)
  }

  render(){
    if (!Sections[this.props.section]) return null
    const Section = Sections[this.props.section]
    return (
      <div className={classNames('accordion-section', {'active': this.props.active})}>
        <h5 className="accordion-header" onClick={this.toggleActive}>{Section.Title}</h5>
        <div className="accordion-content">
          <div>
            <Section data={this.props.data} setData={this.props.setData} addElement={this.addElement} removeElement={this.removeElement}/>
          </div>
        </div>
      </div>
    )
  }
}
