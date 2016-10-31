import React, {Component, PropTypes} from 'react'
// import classNames from 'classnames'

import ShortTextInput from 'parts/ShortTextInput'
import LongTextInput from 'parts/LongTextInput'

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

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
        <ShortTextInput label="Title" onChange={this.handleChange} value={this.props.data.title} name="title"/>
        <LongTextInput label="Description"/>
      </form>
    )
  }
}
