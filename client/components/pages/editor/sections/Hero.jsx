import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Icon from 'parts/Icon'

import ShortTextField from 'parts/ShortTextField'
import LongTextField from 'parts/LongTextField'
import ButtonField from 'parts/ButtonField'
import HeroImageField from 'parts/HeroImageField'

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Title, Description and Image'

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    addElement: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired
  }

  handleChange = (field, value, index) => {
    const d = this.props.data
    if (index === undefined || index === null) d[field] = value
    else d[field][index] = value
    this.props.setData('hero', d)
  }

  addHeroLink = () => {
    const newData = Object.assign({}, this.props.data.buttons[this.props.data.buttons.length-1])
    this.props.addElement(null, newData, false, 'buttons')
  }

  removeElementSpecial = (key, isObject) => {
    this.props.removeElement(key, isObject, 'buttons')
  }

  render(){
    return (
      <form>
        <ShortTextField label="Title" onChange={this.handleChange} value={this.props.data.title} name="title"/>
        <HeroImageField onChange={this.handleChange} />
        <LongTextField label="Description" onChange={this.handleChange} value={this.props.data.description} name="description"/>
        <hr />
        <button type="button"
          className={classNames('btn', 'btn-block')}
          onClick={this.addHeroLink}>
          <span>
            <Icon icon="plus"
              size={1} /> Add Hero Link
          </span>
        </button>
        {
          this.props.data.buttons.map((d, i) => {
            return (
              <ButtonField label="Button"
                           onChange={this.handleChange}
                           removeElement={this.removeElementSpecial}
                           value={d} name="buttons" index={i}
                           key={this.props.data.buttons.indexOf(d)} />
            )
          })
        }
      </form>
    )
  }
}
