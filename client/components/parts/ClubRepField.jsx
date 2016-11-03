import React, {Component, PropTypes} from 'react'

export default class ClubRepField extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    index: PropTypes.string,
    value: PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      email: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    const kind = e.target.dataset.kind
    const val = this.props.value
    val[kind] = e.target.value
    this.props.onChange(this.props.name, val, this.props.index)
  }


  render(){
    return (
      <div className="form-group">
        <label className="form-label">{this.props.label}</label>
        <div className="form-border">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" type="text" data-kind="name" onChange={this.handleChange} value={this.props.value.name} />
          </div>
          <div className="form-group">
            <label className="form-label">Position</label>
            <input className="form-input" type="text" data-kind="position" onChange={this.handleChange} value={this.props.value.position} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="text" data-kind="email" onChange={this.handleChange} value={this.props.value.email} />
          </div>
        </div>
      </div>
    )
  }
}
