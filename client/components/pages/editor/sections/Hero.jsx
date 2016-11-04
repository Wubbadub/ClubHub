import React, {Component, PropTypes} from 'react'
// import classNames from 'classnames'

import ShortTextField from 'parts/ShortTextField'
import LongTextField from 'parts/LongTextField'
import ButtonField from 'parts/ButtonField'

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Landing'

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  }

  handleChange = (field, value, index) => {
    const d = this.props.data
    if (index === undefined || index === null) d[field] = value
    else d[field][index] = value
    this.props.setData('hero', d)
  }

  render(){
    return (
      <form>
        <ShortTextField label="Title" onChange={this.handleChange} value={this.props.data.title} name="title"/>
        <LongTextField label="Description" onChange={this.handleChange} value={this.props.data.description} name="description"/>
        <ButtonField label="Button" onChange={this.handleChange} value={this.props.data.buttons[0]} index={0} name="buttons"/>
        <ButtonField label="Button" onChange={this.handleChange} value={this.props.data.buttons[1]} index={1} name="buttons"/>
      </form>
    )
  }
}
