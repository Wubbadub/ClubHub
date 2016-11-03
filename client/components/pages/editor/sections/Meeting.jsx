import React, {Component, PropTypes} from 'react'

import LongTextField from 'parts/LongTextField'

export default class Meeting extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Meeting Info'

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  }

  handleChange = (field, value) => {
    const d = this.props.data
    d[field] = value
    this.props.setData('meeting', d)
  }

  render(){
    return (
      <form>
        <LongTextField label="Description" onChange={this.handleChange} value={this.props.data.description} name="description"/>
      </form>
    )
  }
}
