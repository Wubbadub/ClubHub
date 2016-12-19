import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import MemberField from 'parts/MemberField'

import Icon from 'parts/Icon'

export default class MembersForm extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    editor: PropTypes.object,
    section: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string
  }

  static defaultProps = {
  }


  handleChange = (field, value, index) => {
    const data = this.props.editor.data.sections[this.props.section]
    data[field][index] = value
    this.props.editor.setData(this.props.section, data)
  }

  addMember = () => {
    const {editor, section, name} = this.props
    editor.addElement(section, name)
  }

  removeMember = (index) => {
    const {editor, section, name} = this.props
    editor.removeElement(section, index, name)
  }


  render(){
    const {editor, name, label, section} = this.props
    const links = editor.data.sections[section][name]
    return (
      <div className="editable-form">
        <div className="editable-form-header">{label}</div>
        <div className="editable-form-content">
          <form>
            {
              links.map((d, i) => {
                return (
                  <MemberField label={`Member #${i+1}`}
                              onChange={this.handleChange}
                              removeElement={this.removeMember}
                              value={d} name={name} index={i}
                              key={i} />
                )
              })
            }
            <button type="button"
              className={classNames('btn', 'btn-default', 'btn-block')}
              onClick={this.addMember}>
              <span>
                <Icon icon="plus" size={1} /> Add a Member
              </span>
            </button>
          </form>
        </div>
      </div>
    )
  }
}
