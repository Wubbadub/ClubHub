import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import ButtonField from 'parts/ButtonField'
import Icon from 'parts/Icon'

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
    setData: PropTypes.func,
    addElement: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired
  }

  handleChange = (field, value, index) => {
    const d = this.props.data
    if (index !== null) d[field][index] = value
    else d[field] = value
    this.props.setData('header', d)
  }

  addSocialLink = () => {
    const newData = Object.assign({}, this.props.data.links[this.props.data.links.length-1])
    this.props.addElement(null, newData, false)
  }

  render(){
    return (
      <form>
        {
          this.props.data.links.map((d, i) => {
            return (
              <ButtonField label="SocialLink"
                           types={this.getLinkTypes()}
                           onChange={this.handleChange}
                           removeElement={this.props.removeElement}
                           value={d} name="links" index={i}
                           key={this.props.data.links.indexOf(d)} />
            )
          })
        }
        <button type="button"
          className={classNames('btn', 'btn-block')}
          onClick={this.addSocialLink}>
          <span>
            <Icon icon="plus"
              size={1} /> Add Social Link
          </span>
        </button>
      </form>
    )
  }
}
