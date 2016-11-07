import React from 'react'
import {render} from 'react-dom'

// Import App
import App from 'App'

// Import Styles and favicon
import 'styles/main.less'
import 'img/favicon.png'

render((
  <App/>
), document.getElementById('app'))
