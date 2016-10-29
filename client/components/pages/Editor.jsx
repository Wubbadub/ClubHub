import React, {PureComponent} from 'react'
import {Link} from 'react-router'
import EditorSection from 'parts/EditorSection'

export default class Editor extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/" className="btn btn-back float-right">Back</Link>
        </div>

        <div id="editor-container" className="col-3" >
          <EditorSection section="General" />
        </div>

      </div>

    )
  }
}
