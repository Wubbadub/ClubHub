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
    this.props.addElement('buttons')
  }

  removeHeroButton = (key) => {
    this.props.removeElement(key, 'buttons')
  }

  render(){
    return (
      <form>
        <ShortTextField label="Title" onChange={this.handleChange} value={this.props.data.title} name="title"/>
        <LongTextField label="Description" onChange={this.handleChange} value={this.props.data.description} name="description"/>
        <hr />
        {
          this.props.data.buttons.map((d, i) => {
            return (
              <ButtonField label={`Button #${i+1}`}
                           onChange={this.handleChange}
                           removeElement={this.removeHeroButton}
                           value={d} name="buttons" index={i}
                           key={i} />
            )
          })
        }
        <button type="button"
          className={classNames('btn', 'btn-default', 'btn-block')}
          onClick={this.addHeroLink}>
          <span>
            <Icon icon="plus" size={1} /> Add a Button
          </span>
        </button>
        <hr />
        <HeroImageField onChange={this.handleChange} />
      </form>
    )
  }
}
