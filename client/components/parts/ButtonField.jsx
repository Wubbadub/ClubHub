import React, {Component, PropTypes} from 'react'

import classNames from 'classnames'
import Icon from 'parts/Icon'

export default class ButtonField extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = () => {
    return {
      label: PropTypes.string,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired,
      index: PropTypes.string.isRequired,
      types: PropTypes.array,
      value: PropTypes.shape({
        type: PropTypes.string,
        text: PropTypes.string,
        href: PropTypes.string
      }).isRequired,
      onChange: PropTypes.func.isRequired,
      removeElement: PropTypes.func.isRequired
    }
  }

  static defaultProps = {
    index: null,
    types: [
      'link',
      'email',
      'facebook',
      'twitter',
      'instagram'
    ]
  }

  handleChange = (e) => {
    const kind = e.target.dataset.kind
    const val = this.props.value
    val[kind] = e.target.value
    this.props.onChange(this.props.name, val, this.props.index)
  }

  removeButton = () => {
    this.props.removeElement(this.props.value, false)
  }

  render(){
    return (
      <div className="form-group">
        <label className="form-label">
          <span>{this.props.label}</span>
          &nbsp;
          <button className={classNames('btn', 'btn-link', 'btn-sm')} type="button" onClick={this.removeButton}>
            <Icon icon="cross_mark" /> Remove
          </button>
        </label>
        <div className="form-border">
          <div className="form-group">
            <select className="form-select text-capitalize" data-kind="type" onChange={this.handleChange} value={this.props.value.type}>
              {this.props.types.map((t) => {
                return (
                  <option key={t} value={t}>{t}</option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Label</label>
            <input className="form-input" type="text" data-kind="text" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.props.value.text} />
          </div>
          <div className="form-group">
            <label className="form-label">Link</label>
            <input className="form-input" type="text" data-kind="href" onChange={this.handleChange} placeholder={this.props.placeholder} value={this.props.value.href} />
          </div>
        </div>
      </div>
    )
  }
}
