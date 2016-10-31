import React, {PureComponent} from 'react'
import {Router, Route, browserHistory} from 'react-router'

// Our Pages
import Splash from 'pages/Splash'
import Editor from 'pages/editor/Editor'
import Site from 'pages/site/Site'


class EditorContainer extends PureComponent {
  render() { return (<Editor site={App.getSite()} />) }
}
class SiteContainer extends PureComponent {
  render() { return (<Site site={App.getSite()} />) }
}

export default class App extends PureComponent{
  constructor(props){
    super(props)
  }

  // TODO: implement data object retrieval from DB
  // TODO: handle case where user does not yet have a site (supply default data)
  static getSite = () => {
    return {
      'title': 'UVic Canoe Club',
      'theme': 'Classic',
      'sections': {
        'hero': {
          'component': 'Hero',
          'title': 'Our Club',
          'description': 'A commmunity of canoe and water lovers to share and experiences of canoeing and help each other rivers and lakes and stuff haha we even like to knowledge.',
          'buttons': [
            {
              'type': 'email',
              'text': 'Contact Us',
              'href': 'mailto:canoe@uvic.ca'
            },
            {
              'type': 'facebook',
              'text': 'Join our Facebook Group',
              'href': 'http://facebook.com/'
            }
          ]
        },
        'header': {
          'nonsense': 'nonsense'
        },
        'footer': {
          'nonsense': 'nonsense'
        }
      }
    }
  }

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
