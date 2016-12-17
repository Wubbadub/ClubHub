import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import * as defaults from './defaults'
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

  addElement = (arrayName) => {
    // deep copy section data
    const newData = Object.assign({}, this.props.data)
    // push new default data item onto list
    newData[arrayName].push(defaults[this.props.section])
    // call set data with new data
    this.props.setData(this.props.section, newData)
  }

  // addElement = (key, data, isObject, arrayName = 'links') => {
  //   const newData = Object.assign({}, this.props.data)
  //   console.log(newData === this.props.data)
  //   if (isObject) newData[key] = data
  //   else newData[arrayName].push(data)
  //   this.props.setData(this.props.section, newData)
  // }

  removeElement = (key, isObject, arrayName = 'links') => {
    const newData = this.props.data
    if (isObject) delete newData[key]
    else {
      const index = this.props.data[arrayName].indexOf(key)
      if (index > -1) this.props.data[arrayName].splice(index, 1)
    }
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
