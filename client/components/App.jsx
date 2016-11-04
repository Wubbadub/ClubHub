import React, {PureComponent, PropTypes} from 'react'
import {Router, Route, browserHistory} from 'react-router'
import Async from 'react-promise'

// Our Pages
import Splash from 'pages/Splash'
import Editor from 'pages/editor/Editor'
import Site from 'pages/site/Site'


class EditorContainer extends PureComponent {
  render() {
    return (
      <Async
        promise={App.getSite()}
        then={(site) =>
          <Editor site={site} />
        }>
      </Async>
    )
  }
}
class SiteContainer extends PureComponent {
  render() {
    return (
      <Async
        promise={App.getSite()}
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

  // static propTypes = {
  //   params: {
  //     site: PropTypes.string
  //   }
  // }

  // TODO: implement data object retrieval from DB
  // TODO: handle case where user does not yet have a site (supply default data)
  static getSite = () => {
    const request = new Request('http://www.hubsite.club/api/site/test1', {method: 'GET'})
    return Promise.resolve(fetch(request).then((response) => {
      return response.json().then((content) => {
        console.log(content)
        return content
      })
    }))
  }
        //`${window.location.protocol}//${window.location.hostname}/api/site/${this.props.params.site}`,

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Splash}/>
        <Route path="/editor/:site" component={EditorContainer}/>
        <Route path="/site/:site" component={SiteContainer}/>
      </Router>
    )
  }
}
