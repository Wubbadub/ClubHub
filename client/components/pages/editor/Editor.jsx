import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import classNames from 'classnames'
import cookie from 'react-cookie'

import Config from 'Config'
import Icon from 'parts/Icon'
import Brand from 'parts/Brand'
import Toast from 'parts/Toast'

import Site from 'pages/site/Site'
import EditorSection from 'pages/editor/EditorSection'

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sectionStates: this.makeSiteSections(),
      showEditorBar: false,
      dirtyBit: false,
      site: this.props.site,
      bodyScroll: true,
      editorToast: true
    }
  }

  static propTypes = {
    site: PropTypes.object,
    siteId: PropTypes.string
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({editorToast: false})
    }, 100)
  }

  makeSiteSections = () => {
    const sections = {}
    for (const sectionTitle in this.props.site.sections) {
      sections[sectionTitle] = false
    }
    return sections
  }

  toggleEditorBar = () => {
    this.setState({showEditorBar: !this.state.showEditorBar})
  }

  toggleSection = (s) => {
    const sections = this.state.sectionStates
    if (sections[s] === true) sections[s] = !sections[s]
    else {
      Object.keys(sections).forEach((section) => { sections[section] = false })
      sections[s] = true
    }
    this.setState({sectionStates: sections})
  }

  setData = (section, data) => {
    const s = this.state.site
    s.sections[section] = data
    this.setState({site: s, dirtyBit: true})
  }

  handleSubmit = () => {
    fetch(`http://${Config.server}/api/site/${this.props.siteId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': cookie.load('authorization'),
        'Temporary-Key': cookie.load('Temporary-Key')
      },
      body: JSON.stringify(this.state.site)
    }).then(() => {
      this.setState({dirtyBit: false})

      // TODO: Replace this with a button or checkbox or some other intuitive method instead of forcing the site active on every save
      fetch(`http://${Config.server}/api/active/${this.props.siteId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': cookie.load('authorization'),
          'Temporary-Key': cookie.load('Temporary-Key')
        },
        body: JSON.stringify({active: true})
      })
    })
  }

  disableBodyScroll = () => {
    this.setState({bodyScroll: false})
    document.body.style.overflow = 'hidden'
  }

  enableBodyScroll = () => {
    this.setState({bodyScroll: true})
    document.body.style.overflow = ''
  }

  getHelp = () => {
    this.setState({editorToast: false})
    this.setState({editorToast: true})
    setTimeout(() => {
      this.setState({editorToast: false})
    }, 100)
  }

  render() {
    return (
      <div className="editor container">
        <div className="columns">
          <div className={classNames('editor-bar', 'col-3', {'active': this.state.showEditorBar})} onMouseEnter={this.disableBodyScroll} onMouseLeave={this.enableBodyScroll}>
            <button type="button" className="toggle" onClick={this.toggleEditorBar}><Icon icon="chevron_right" />
              <Toast
                icon="arrow_left"
                pushActive={this.state.editorToast}
                timeout={5000}
                class="editor-point"
                text={!this.state.showEditorBar ? `Click to start editing` : `Edit your site content here`}
                />
            </button>
            <div className="editor-header">
              <a href={`http://${Config.host}`} target="_blank">
                <Brand />
              </a>
            </div>
            <div className="editor-viewbox">
              <div className="accordion">
                {Object.keys(this.state.site.sections).map((s) => {
                  const section = this.state.site.sections[s]
                  return (
                    <EditorSection key={s}
                      section={s}
                      active={this.state.sectionStates[s]}
                      toggleSection={this.toggleSection}
                      data={section}
                      setData={this.setData}
                      />
                  )
                })}
              </div>
            </div>
            <div className="editor-footer">
              <Link className={classNames('btn', 'btn-link')} to={`/`} target="_blank"><Icon icon="eye"/>&nbsp;&nbsp;View Site</Link>
              <button type="button" className={classNames('btn', 'btn-primary', 'btn-save', {disabled: !this.state.dirtyBit})} onClick={this.handleSubmit}><Icon icon="cloud_upload"/>&nbsp;&nbsp;Save</button>
            </div>
          </div>
          <div className="site-preview col-12">
            <Site site={this.state.site} />
          </div>
          <div className={classNames('editor-help')}>
            <button className={classNames('btn', 'btn-lg')} type="button" onClick={this.getHelp}>Help <Icon icon="white_question" /></button>
          </div>
        </div>
      </div>
    )
  }
}
