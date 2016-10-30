import React, {PureComponent, PropTypes} from 'react'

const bg = require('img/canoe.png')

export default class Hero extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    site: PropTypes.object
  }

  render() {
    return (
      <div className="hero-container">
          <div className="hero-image" style={{backgroundImage: `url(${bg})`}}>
          </div>
          <div className="hero-content center">
              <h1>{this.props.site.sections.hero.title}</h1>
              <p>
                  A commmunity of canoe and water lovers to share and experiences
                  of canoeing and help each other rivers and lakes and stuff
                  haha we even like to knowledge.
              </p>
              <button type="button" name="button">Join</button>
              <button type="button" name="button">Contact</button>
          </div>
      </div>
    )
  }
}
