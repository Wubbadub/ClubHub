import React, {PureComponent} from 'react'

const twitter = require('../../img/twitter.svg')
const facebook = require('../../img/facebook.svg')
const instagram = require('../../img/instagram.png')

export default class ClassicHero extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <header>
          <ul>
              <li>
                  <a href="#" target="_blank" ><img src={twitter} alt="" /></a>
              </li>
              <li>
                  <a href="#" target="_blank" ><img src={facebook} alt="" /></a>
              </li>
              <li>
                  <a href="#" target="_blank" ><img src={instagram} alt="" /></a>
              </li>
          </ul>
      </header>
    )
  }
}
