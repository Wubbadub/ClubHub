import React, {PureComponent} from 'react'

import Config from 'Config'

import Icon from 'parts/Icon'
import Brand from 'parts/Brand'

export default class Footer extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <footer className="flex-direction_row">
          <div className="flex-direction_row">
              <div className=" footer-made-by flex-direction_column">
                  <span>this website was made using</span>
                  <div className="footer-logo">
                    <Brand />
                  </div>
              </div>
              <ul>
                  <li><a href="http://twitter.com/tryclubhub" target="_blank"><Icon icon="twitter"/>@tryclubhub</a></li>
                  <li><a href={`mailto:contact@${Config.host}`} target="_blank"><Icon icon="mail"/>{`contact@${Config.host}`}</a></li>
              </ul>
          </div>
          <ul className="more">
              <li><a href="http://tryclubhub.com" target="_blank">Create your own website <Icon icon="arrow_right"/></a></li>
          </ul>
      </footer>
    )
  }
}
