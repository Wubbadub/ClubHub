import React, {Component, PropTypes} from 'react'
import Icon from 'parts/Icon'

const map = require('img/map.png')

export default class Meeting extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    data: PropTypes.object
  }

  render() {
    return (
      <section className="responsive-column">
          <div className="main-container-text">
              <h1>When and Where</h1>
              <p id="description">{this.props.data.description}</p>
              <p className="stats">
                  <Icon icon="clock"/>&nbsp;
                  Usually <strong>Wednesdays</strong> at <strong>330pm</strong>
              </p>
              <p className="stats">
                  <Icon icon="placepin"/>&nbsp;
                  <a href="#" target="_blank">Outside the entrance of <strong>McKinnon Gym</strong></a>
              </p>
          </div>
          <div className="main-container-img" style={{backgroundImage: `url(${map})`}}></div>
      </section>
    )
  }
}
