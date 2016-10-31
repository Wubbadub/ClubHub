import React, {Component, PropTypes} from 'react'
// import classNames from 'classnames'

import ShortTextField from 'parts/ShortTextField'
import LongTextField from 'parts/LongTextField'

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Landing'

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  }

  handleChange = (field, value) => {
    const d = this.props.data
    d[field] = value
    this.props.setData('hero', d)
  }

  render(){
    return (
      <form>
        <ShortTextField label="Title" onChange={this.handleChange} value={this.props.data.title} name="title"/>
        <LongTextField label="Description" onChange={this.handleChange} value={this.props.data.description} name="description"/>
      </form>
    )
  }
}
