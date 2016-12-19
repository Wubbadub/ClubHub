import React, {Component, PropTypes} from 'react'


import Editable from 'pages/editor/Editable'
import MembersForm from 'pages/editor/forms/MembersForm'

export default class Team extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    editor: PropTypes.object
  }

  render() {
    const {editor, data} = this.props
    const edit = editor !== null
    return (
      <section>
        <div className="team">
          {data.members.length > 0 ? <h1>Who</h1> : null}
          <Editable edit={edit} place="above" form={<MembersForm label="Club Administrators" editor={editor} section="team" name="members"/>}>
            <div className="people">
              {
                data.members.map((member, i) => {
                  return (
                    <div key={i} className="person">
                      <span>{member.name} - {member.position}</span>
                      <a href={`mailto:${member.email}`} target="_blank">{member.email}</a>
                    </div>
                  )
                })
              }
            </div>
          </Editable>
        </div>
      </section>
    )
  }
}
