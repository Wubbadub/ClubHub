import React, {PureComponent, PropTypes} from 'react'

import Hero from './Classic/Hero'
import Header from './Classic/Header'
import Content from './Classic/Content'
import Footer from './Classic/Footer'

export default class Site extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    route: PropTypes.object
  }

  render() {
    return (
    <div className="site theme-classic outer-container">
      <Header/>
      <Hero/>
      <Content/>
      <Footer/>
    </div>
    )
  }
}
