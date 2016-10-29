import React, {PureComponent} from 'react'
import {Link} from 'react-router'

export default class Editor extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Link to="/" className="btn btn-back float-right">Back</Link>
      </div>

    )
  }
}
