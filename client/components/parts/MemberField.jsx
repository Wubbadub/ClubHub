import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import Icon from 'parts/Icon'

export default class MemberField extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    name: PropTypes.string,
    index: PropTypes.number.isRequired,
    value: PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired,
    label: PropTypes.string
  }

  handleChange = (e) => {
    const {name, index, value} = this.props
    const field = e.target.dataset.kind
    const val = value
    val[field] = e.target.value
    this.props.onChange(name, val, index)
  }

  removeMember = () => {
    this.props.removeElement(this.props.index)
  }

  render(){
    const {value, label} = this.props
    return (
      <div className="form-group">
        <div className="form-label">
          <label>{this.props.label}</label>
          &nbsp;
          <button className={classNames('btn', 'btn-link', 'btn-sm')} type="button" onClick={this.removeMember}>
            <Icon icon="cross_mark" /> Remove
          </button>
        </div>
        <div className="form-border">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" data-kind="name" onChange={this.handleChange} value={value.name} />
          </div>
          <div className="form-group">
            <label className="form-label">Position</label>
            <input className="form-input" type="text" data-kind="position" onChange={this.handleChange} value={value.position} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="text" data-kind="email" onChange={this.handleChange} value={value.email} />
          </div>
        </div>
      </div>
    )
  }
}
