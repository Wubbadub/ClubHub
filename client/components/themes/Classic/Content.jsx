import React, {PureComponent} from 'react'

import Meeting from './Sections/Meeting'
import Team from './Sections/Team'

export default class Content extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="main-container">
        <Meeting/>
        <Team/>
      </div>
    )
  }
}
