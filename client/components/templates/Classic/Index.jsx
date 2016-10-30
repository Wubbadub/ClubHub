import React, {PureComponent, PropTypes} from 'react'

import Hero from './Hero'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

export default class Classic extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    route: PropTypes.object
  }

  render() {
    return (
    <div className="theme-classic outer-container">
      <Header/>
      <Hero/>
      <Content/>
      <Footer/>
    </div>
    )
  }
}

