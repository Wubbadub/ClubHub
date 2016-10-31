import React, {PureComponent, PropTypes} from 'react'

import Site from 'pages/site/Site'
import EditorSection from 'pages/editor/EditorSection'

export default class Editor extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sectionStates: this.makeSiteSections(),
      site: this.props.site
    }
  }

  static propTypes = {
    site: PropTypes.object
  }

  makeSiteSections = () => {
    const sections = {}
    for (const sectionTitle in this.props.site.sections) {
      sections[sectionTitle] = false
    }
    return sections
  }

  toggleSection = (s) => {
    const sections = this.state.sectionStates
    sections[s] = !sections[s]
    this.setState({sectionStates: sections})
    this.forceUpdate()
  }

  setData = (section, data) => {
    const s = this.state.site
    s.sections[section] = data
    this.setState({site: s})
    this.forceUpdate()
  }

  render() {
    return (
      <div className="editor container">
        <div className="columns">
          <div className="editor-bar col-3">
            <div className="accordion">
              {Object.keys(this.state.site.sections).map((s) => {
                const section = this.state.site.sections[s]
                if (!section.editor) return null
                return (
                  <EditorSection key={s}
                                 section={s}
                                 title={section.editor}
                                 active={this.state.sectionStates[s]}
                                 setActive={this.toggleSection}
                                 data={section}
                                 setData={this.setData}/>
                )
              })}
            </div>
          </div>
          <div className="site-preview col-12">
            <Site site={this.state.site}/>
          </div>
        </div>
      </div>
    )
  }
}
