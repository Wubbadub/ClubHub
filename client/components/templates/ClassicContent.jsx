import React, {PureComponent} from 'react'

import ClassicContentMeeting from 'templates/ClassicContentMeeting'
import ClassicContentTeam from 'templates/ClassicContentTeam'

export default class ClassicContent extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="main-container">
        <ClassicContentMeeting/>
        <ClassicContentTeam/>
      </div>
    )
  }
}
