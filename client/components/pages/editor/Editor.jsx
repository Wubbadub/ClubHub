import React, {Component, PropTypes} from 'react'
import cookie from 'react-cookie'
import classNames from 'classnames'

import Config from 'Config'
import Icon from 'parts/Icon'
import Brand from 'parts/Brand'

import Site from 'pages/site/Site'
import LoginModal from 'parts/LoginModal'

import ShortTextField from 'parts/ShortTextField'

import * as defaults from './defaults'

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dirtyBit: false,
      site: this.props.site,
      preview: false,
      showLogin: false
    }
  }

  static propTypes = {
    site: PropTypes.object,
    siteId: PropTypes.string
  }

  setData = (section, data) => {
    const s = Object.assign({}, this.state.site)
    s.sections[section] = data
    this.setState({site: s, dirtyBit: true})
  }

  addElement = (section, arrayName) => {
    // deep copy section data
    const newData = Object.assign({}, this.state.site.sections[section])
    // push new default data item onto list
    newData[arrayName].push(Object.assign({}, defaults[section]))
    // call setData with new data
    this.setData(section, newData)
  }

  removeElement = (section, index, arrayName) => {
    // deep copy section data
    const newData = Object.assign({}, this.state.site.sections[section])
    // splice out element if it exists
    if (index > -1) newData[arrayName].splice(index, 1)
    // call setData with new data
    this.setData(section, newData)
  }

  sendSiteData = () => {
    fetch(`http://${Config.server}/api/site/${this.props.siteId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(this.state.site)
    }).then((res) => {
      if (res.ok) {
        this.setState({
          dirtyBit: false,
          showLogin: false
        })

        // TODO: Replace this with a button or checkbox or some other intuitive method instead of forcing the site active on every save
        fetch(`http://${Config.server}/api/active/${this.props.siteId}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({active: true})
        })
      }
    })
  }

  // Check if a user is already logged in. Show the login modal if they aren't.
  isAuthenticated = () => {
    const auth = cookie.load('authorization')
    return auth && auth !== ''
  }

  save = () => {
    this.setState({showLogin: false})
    if (this.isAuthenticated()){
      this.sendSiteData()
    } else {
      this.setState({showLogin: true})
    }
  }

  hideLogin = () => {
    this.setState({showLogin: false})
  }

  onPreviewChange = (e) => {
    this.setState({preview: e.target.checked})
  }

  handleTitleChange = (name, data) => {
    const s = Object.assign({}, this.state.site)
    s[name] = data
    this.setState({site: s, dirtyBit: true})
  }

  render() {
    const editor = {
      data: this.state.site,
      setData: this.setData,
      addElement: this.addElement,
      removeElement: this.removeElement
    }
    return (
      <div className={classNames('editor', {'editor-preview': this.state.preview})}>
        <LoginModal active={this.state.showLogin} close={this.hideLogin} callback={this.save}/>
        <div className="editor-toolbox" onMouseEnter={this.disableBodyScroll} onMouseLeave={this.enableBodyScroll}>
          <div className="editor-header">
            <h1>
              <a href={`http://${Config.host}`} target="_blank"><Brand /></a>
              <small>Editor</small>
            </h1>
          </div>
          <div className="editor-body">
            <ShortTextField label="Club Name" placeholder="Super cool club name" name="title" value={this.state.site.title} onChange={this.handleTitleChange}/>
            <div className="form-group">
              <label className="form-switch">
                <input type="checkbox" checked={this.state.preview} onChange={this.onPreviewChange}/>
                <i className="form-icon"></i> Preview Mode
              </label>
            </div>
          </div>
          <div className="editor-footer">
            <a className={classNames('btn', 'btn-link')} href={`http://${this.props.siteId}.${Config.subhosts[0]}`} target="_blank"><Icon icon="eye"/>&nbsp;&nbsp;View Site</a>
            {(() => {
              if (this.state.dirtyBit) {
                return <button type="button" className={classNames('btn', 'btn-primary', 'btn-save')} onClick={this.save}><Icon icon="cloud_upload"/>&nbsp;&nbsp;Save</button>
              } else {
                return <button type="button" className={classNames('btn', 'btn-primary', 'btn-save', 'disabled')} ><Icon icon="check"/>&nbsp;&nbsp;Saved</button>
              }
            })()}
          </div>
        </div>
        <Site site={this.state.site} editor={editor} />
      </div>
    )
  }
}
