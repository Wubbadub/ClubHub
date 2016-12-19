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
    site: PropTypes.object.isRequired,
    editor: PropTypes.object
  }

  static defaultProps = {
    editor: null
  }

  render() {
    const {site, editor} = this.props
    return (
    <div className="theme-classic outer-container">
      <Header data={site.sections.header} editor={editor}/>
      <Hero data={site.sections.hero} editor={editor}/>
      <div className="main-container">
        <Meeting data={site.sections.meeting} editor={editor}/>
        <Team data={site.sections.team} editor={editor}/>
      </div>
      <Footer site={site}/>
    </div>
    )
  }
}
