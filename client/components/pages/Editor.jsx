import React, {PureComponent} from 'react'
import {Link} from 'react-router'

export default class Editor extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Link to="/">Go back, I am full of regret!</Link>
      </div>
    )
  }
}
