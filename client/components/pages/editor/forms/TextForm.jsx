import React, {Component, PropTypes} from 'react'

import ShortTextField from 'parts/ShortTextField'
import LongTextField from 'parts/LongTextField'

export default class TextForm extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    editor: PropTypes.object.isRequired,
    section: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    long: PropTypes.bool
  }

  static defaultProps = {
    long: false
  }

  handleChange = (field, value) => {
    const data = this.props.editor.data.sections[this.props.section]
    data[field] = value
    this.props.editor.setData(this.props.section, data)
  }

  render(){
    const {editor, name, label, long, section} = this.props
    const value = editor.data.sections[section][name]
    return (
      <div className="editable-form">
        <div className="editable-form-header">{label}</div>
        <div className="editable-form-content">
          <form>
            {long ?
              <LongTextField onChange={this.handleChange} value={value} name={name} />
              :
              <ShortTextField onChange={this.handleChange} value={value} name={name} />
            }
          </form>
        </div>
      </div>
    )
  }
}
