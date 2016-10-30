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
    site: PropTypes.object
  }

  render() {
    return (
    <div className="theme-classic outer-container">
      <Header site={this.props.site}/>
      <Hero site={this.props.site}/>
      <Content site={this.props.site}/>
      <Footer site={this.props.site}/>
    </div>
    )
  }
}

