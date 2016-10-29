import React, {PureComponent} from 'react'

const twitter = require('../../img/twitter.svg')
const envelope = require('../../img/envelope.svg')
const logo = require('../../img/logo.svg')
const arrow = require('../../img/arrow.svg')

export default class ClassicFooter extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <footer className="flex-direction_row">
          <div className="flex-direction_row">
              <div className=" footer-made-by flex-direction_column">
                  <span>this website was made by</span>
                  <img className="footer-logo" src={logo} alt="" />
              </div>
              <ul>
                  <li><a href="#" target="_blank"><img className="icon" src={twitter} alt="" />@getclubhub</a></li>
                  <li><a href="mailto:contact@hubsite.club" target="_blank"><img className="icon envelope" src={envelope} alt="" />contact@hubsite.club</a></li>
              </ul>
          </div>
          <ul className="more">
              <li><a href="#" target="_blank">Create your own website <img className="icon" src={arrow} alt="" /></a></li>
              <li><a href="#" target="_blank">Search more clubs at UVic <img className="icon" src={arrow} alt="" /></a></li>
          </ul>
      </footer>
    )
  }
}
