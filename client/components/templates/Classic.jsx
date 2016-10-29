import React, {PureComponent} from 'react'

import ClassicHero from 'templates/ClassicHero'
import ClassicHeader from 'templates/ClassicHeader'
import ClassicContent from 'templates/ClassicContent'
import ClassicFooter from 'templates/ClassicFooter'

export default class Classic extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
    <div className="site theme-classic outer-container">
      <ClassicHeader/>
      <ClassicHero/>
      <ClassicContent/>
      <ClassicFooter/>
    </div>
    )
  }
}
