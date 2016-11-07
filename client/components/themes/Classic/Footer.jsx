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
                  <span>this website was made by</span>
                  <div className="footer-logo">
                    <Brand />
                  </div>
              </div>
              <ul>
                  <li><a href="#" target="_blank"><Icon icon="twitter"/>@getclubhub</a></li>
                  <li><a href={`mailto:contact@${Config.server}`} target="_blank"><Icon icon="mail"/>{`contact@${Config.server}`}</a></li>
              </ul>
          </div>
          <ul className="more">
              <li><a href="#" target="_blank">Create your own website <Icon icon="arrow_right"/></a></li>
              <li><a href="#" target="_blank">Search more clubs at UVic <Icon icon="arrow_right"/></a></li>
          </ul>
      </footer>
    )
  }
}
