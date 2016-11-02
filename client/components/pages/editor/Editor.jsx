import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import Icon from 'parts/Icon'

import Site from 'pages/site/Site'
import EditorSection from 'pages/editor/EditorSection'

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sectionStates: this.makeSiteSections(),
      showEditorBar: true,
      site: this.props.site
    }
  }

  static propTypes = {
    site: PropTypes.object
  }

  makeSiteSections = () => {
    const sections = {}
    for (const sectionTitle in this.props.site.sections) {
      sections[sectionTitle] = true
    }
    return sections
  }

  toggleEditorBar = () => {
    this.setState({showEditorBar: !this.state.showEditorBar})
  }

  toggleSection = (s) => {
    const sections = this.state.sectionStates
    sections[s] = !sections[s]
    this.setState({sectionStates: sections})
  }

  setData = (section, data) => {
    const s = this.state.site
    s.sections[section] = data
    this.setState({site: s})
  }

  render() {
    return (
      <div className="editor container">
        <div className="columns">
          <div className={classNames('editor-bar', 'col-3', {'active': this.state.showEditorBar})}>
            <button type="button" className="toggle" onClick={this.toggleEditorBar}><Icon icon="chevron_right"/></button>
            <div className="accordion">
              {Object.keys(this.state.site.sections).map((s) => {
                const section = this.state.site.sections[s]
                return (
                  <EditorSection key={s}
                                 section={s}
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
