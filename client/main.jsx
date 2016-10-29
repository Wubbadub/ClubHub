import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'

// Our Pages
import Splash from 'pages/Splash'
import Editor from 'pages/Editor'
import Site from 'templates/Site'

// Import Styles
import './styles/main.less'

render((
<Router history={browserHistory}>
  <Route path="/" component={Splash}/>
  <Route path="/editor" component={Editor}/>
  <Route path="/site" component={Site}/>
</Router>
), document.getElementById('app'))
