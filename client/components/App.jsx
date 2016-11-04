import React, {PureComponent, PropTypes} from 'react'
import {Router, Route, browserHistory} from 'react-router'
import Async from 'react-promise'

// Our Pages
import Splash from 'pages/Splash'
import Editor from 'pages/editor/Editor'
import Site from 'pages/site/Site'


class EditorContainer extends PureComponent {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    params: PropTypes.shape ({
      siteId: PropTypes.string
    })
  }

  render() {
    const {siteId} = this.props.params
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
    params: PropTypes.shape ({
      siteId: PropTypes.string
    })
  }

  render() {
    const {siteId} = this.props.params
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

  static propTypes = {
    params: PropTypes.shape ({
      siteId: PropTypes.string
    })
  }

  static getSite = (siteId) => {
    const request = new Request(
      `http://www.hubsite.club/api/site/${siteId}`,
      {method: 'GET'}
    )
    return Promise.resolve(fetch(request).then((response) => {
      return response.json().then((content) => {
        return content
      })
    }))
  }
  
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Splash}/>
        <Route path="/editor/:siteId" component={EditorContainer}/>
        <Route path="/site/:siteId" component={SiteContainer}/>
      </Router>
    )
  }
}
