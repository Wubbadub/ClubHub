import React, {PureComponent} from 'react'
import Icon from 'parts/Icon'

export default class Hero extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <header>
          <ul>
              <li>
                  <a href="#" target="_blank" ><Icon icon="twitter_circle" size={1.5} /></a>
              </li>
              <li>
                  <a href="#" target="_blank" ><Icon icon="facebook_circle" size={1.5}/></a>
              </li>
              <li>
                  <a href="#" target="_blank" ><Icon icon="instagram_circle" size={1.5}/></a>
              </li>
          </ul>
      </header>
    )
  }
}
