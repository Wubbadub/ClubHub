import React, {PureComponent} from 'react'
import Icon from 'parts/Icon'

const map = require('img/map.png')

export default class Meeting extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <section className="responsive-column">
          <div className="main-container-text">
              <h1>When and Where</h1>
              <p>
                  Each meeting we practice our skills and invite local experts
                  to provide workshops and lessons. Sometimes we also meet up
                  for sodie pops at Swan’s downtown! On rainy days we usually cancel.
              </p>
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
