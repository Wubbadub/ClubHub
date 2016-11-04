import React, {Component, PropTypes} from 'react'
// import classNames from 'classnames'

import ButtonField from 'parts/ButtonField'

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Social Links'

  getLinkTypes = () => {
    return [
      'facebook',
      'twitter',
      'instagram'
    ]
  }

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  }

  handleChange = (field, value, index) => {
    const d = this.props.data
    if (index !== null) d[field][index] = value
    else d[field] = value
    this.props.setData('header', d)
  }

  render(){
    return (
      <form>
        <ButtonField label="Social Link" types={this.getLinkTypes()} onChange={this.handleChange} value={this.props.data.links[0]} index={0} name="links"/>
        <ButtonField label="Social Link" types={this.getLinkTypes()} onChange={this.handleChange} value={this.props.data.links[1]} index={1} name="links"/>
        <ButtonField label="Social Link" types={this.getLinkTypes()} onChange={this.handleChange} value={this.props.data.links[2]} index={2} name="links"/>
      </form>
    )
  }
}
