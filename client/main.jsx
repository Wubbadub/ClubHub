import React from 'react'
import {render} from 'react-dom'
import ClubHub from 'ClubHub'
import Editor from 'pages/Editor'
import {Router, Route, browserHistory} from 'react-router'

// Import Styles
import './styles/main.less'

render((
<Router history={browserHistory}>
  <Route path="/" component={ClubHub}/>
  <Route path="/editor" component={Editor}/>
</Router>
), document.getElementById('app'))
