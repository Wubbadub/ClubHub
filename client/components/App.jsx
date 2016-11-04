import React, {PureComponent, PropTypes} from 'react'
import {Router, Route, browserHistory} from 'react-router'

// Our Pages
import Splash from 'pages/Splash'
import Editor from 'pages/editor/Editor'
import Site from 'pages/site/Site'


class EditorContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      siteData: undefined
    }
  }

  componentWillMount() {
    Promise.resolve(App.getSite()).then((content)=>this.setState({siteData:content}))
  }

  render() {
    if (this.state.siteData === undefined) return <p>Loading</p>
    else return <Site site={this.state.siteData} id={this.state.siteData.title}/>
  }
}
class SiteContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      siteData: undefined
    }
  }

  componentWillMount() {
    Promise.resolve(App.getSite()).then((content)=>this.setState({siteData:content}))
  }

  render() {
    if (this.state.siteData === undefined) return <p>Loading</p>
    else return <Site site={this.state.siteData} id={this.state.siteData.title}/>
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
