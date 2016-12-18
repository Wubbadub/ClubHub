import React, {PureComponent, PropTypes} from 'react'
import {Router, Route, browserHistory} from 'react-router'
import Async from 'react-promise'

import Config from 'Config'

// Our Pages
import Splash from 'pages/Splash'
import Editor from 'pages/editor/Editor'
import Site from 'pages/site/Site'

// Legacy support for old bookmarks using "siteId.subhost/edit"
class EditorRedirect extends PureComponent {
  render() {
    window.location.assign(`http://${Config.host}/edit/${window.location.host}`)
    return (<div>Redirecting..</div>)
  }
}

class EditorContainer extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    params: React.PropTypes.object.isRequired
  }

  render() {
    let {siteId} = this.props.params
    siteId = siteId.split('.')[0]
    return (
      <Async
        promise={App.getSite(siteId)}
        then={(site) =>
          <Editor site={site} siteId={siteId}/>
        }>
      </Async>
    )
  }
}

class SiteContainer extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    params: React.PropTypes.object.isRequired,
    route: PropTypes.shape ({
      siteId: PropTypes.string
    })
  }

  render() {
    let {siteId} = this.props.route
    if (!siteId)
      siteId = this.props.params.siteId // For previewing inactive sites with auth
    return (
      <Async
        promise={App.getSite(siteId)}
        then={(site) =>
          <Site site={site} />
        }>
      </Async>
    )
  }
}

export default class App extends PureComponent{
  constructor(props){
    super(props)
  }

  getRouter = () => {
    let names = window.location.host.split('.')
    names = names[0] === ('www') ? names.slice(1) : names // trim www

    if (Config.subhosts.indexOf(names.slice(1).join('.')) >= 0)
      // Sub host (club site)
      return (
        <Router history={browserHistory}>
          <Route siteId={names[0]} component={SiteContainer} path="/" />
          <Route component={EditorRedirect} path="/edit"/>
        </Router>
      )
    else
      // Main host (clubhub site)
      return (
        <Router history={browserHistory}>
          <Route component={Splash} path="/"/>
          <Route component={EditorContainer} path="/edit/:siteId"/>
          <Route component={SiteContainer} path="/preview/:siteId"/>
        </Router>
      )
  }

  static getSite = (siteId) => {
    const request = new Request(
      `http://${Config.server}/api/site/${siteId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
    return Promise.resolve(fetch(request).then((response) => {
      return response.json().then((content) => {
        return content
      })
    }))
  }

  render() {
    return (this.getRouter())
  }
}
