import React, {Component, PropTypes} from 'react'

import Hero from './Hero'
import Header from './Header'
import Meeting from './Meeting'
import Team from './Team'
import Footer from './Footer'

export default class Classic extends Component{
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
      <div className="main-container">
        <Meeting data={this.props.site.sections.meeting} />
        <Team data={this.props.site.sections.team} />
      </div>
      <Footer site={this.props.site}/>
    </div>
    )
  }
}
