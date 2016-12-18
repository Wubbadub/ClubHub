import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import Icon from 'parts/Icon'

export default class ClubRepField extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    label: PropTypes.string,
    index: PropTypes.number.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    const field = e.target.dataset.kind
    const val = this.props.data
    val[field] = e.target.value
    this.props.onChange(this.props.index, val)
  }

  removeMember = () => {
    this.props.removeElement(this.props.data)
  }

  render(){
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
            <input className="form-input" type="text" data-kind="name" onChange={this.handleChange} value={this.props.data.name} />
          </div>
          <div className="form-group">
            <label className="form-label">Position</label>
            <input className="form-input" type="text" data-kind="position" onChange={this.handleChange} value={this.props.data.position} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="text" data-kind="email" onChange={this.handleChange} value={this.props.data.email} />
          </div>
        </div>
      </div>
    )
  }
}
