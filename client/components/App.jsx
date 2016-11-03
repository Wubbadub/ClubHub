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
        'header': {
          'links': [
            {
              'type': 'facebook',
              'text': 'Join us on Facebook',
              'href': 'http://facebook.com/'
            },
            {
              'type': 'twitter',
              'text': 'Follow us on Twitter',
              'href': 'http://twitter.com/'
            },
            {
              'type': 'instagram',
              'text': 'Follow us on Instagram',
              'href': 'http://instagram.com/'
            }
          ]
        },
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
              'text': 'Join us on Facebook',
              'href': 'http://facebook.com/'
            }
          ]
        },
        'meeting': {
          'description': 'A community of canoe and water lovers to share and experiences of canoeing and help each other rivers and lakes and stuff haha we even like to knowledge.',
          'place': 'DTB A104',
          'day': 'Wednesday',
          'time': '3:30pm'
        },
        'team': {
          'person1': {
            'name': 'Christopher Plummer',
            'position': 'Prez',
            'email': 'chrissy_plum@uvic.ca'
          },
          'person2': {
            'name': 'Michael Scarn',
            'position': 'Regional Manager',
            'email': 'michael@uvic.ca'
          },
          'person3': {
            'name': 'Dwight Shrudt',
            'position': 'Assistant (to the) Regional Manager',
            'email': 'turnupwithturnips@uvic.ca'
          }
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
