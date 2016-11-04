import React, {Component, PropTypes} from 'react'

import Icon from 'parts/Icon'

const bg = require('img/canoe.png')

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    site: PropTypes.object
  }

  getButtonIcon = (type) => {
    switch (type) {
      case 'email':
        return <Icon icon="mail"/>
      case 'facebook':
        return <Icon icon="facebook"/>
      case 'twitter':
        return <Icon icon="twitter"/>
      case 'instagram':
        return <Icon icon="instagram"/>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="hero-container">
          <div className="hero-image" style={{backgroundImage: `url(${bg})`}}>
          </div>
          <div className="hero-content center">
              <h1>{this.props.site.sections.hero.title}</h1>
              <p>{this.props.site.sections.hero.description}</p>
              {this.props.site.sections.hero.buttons.map((b, i) => {
                return (
                  <a target="blank" key={i} href={b.href}>{this.getButtonIcon(b.type)}&nbsp;&nbsp;{b.text}</a>
                )
              })}
          </div>
      </div>
    )
  }
}
