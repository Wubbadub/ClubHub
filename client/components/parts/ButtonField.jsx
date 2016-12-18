import React, {Component, PropTypes} from 'react'

import classNames from 'classnames'
import Icon from 'parts/Icon'

export default class ButtonField extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = () => {
    return {
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired,
      index: PropTypes.string.isRequired,
      types: PropTypes.array,
      typeTemplates: PropTypes.object,
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
    ],
    typeTemplates: {
      link: {
        label: 'Link URL',
        placeholder: 'http://www.somewhere.com'
      },
      email: {
        label: 'Email Address',
        preprefix: 'mailto:',
        placeholder: 'person@somewhere.com'
      },
      facebook: {
        label: 'Facebook URL',
        placeholder: 'group/something',
        preprefix: 'http://', // Not displayed
        prefix: 'facebook.com/' // Displayed
      },
      twitter: {
        label: 'Twitter Handle',
        placeholder: 'someone',
        preprefix: 'http://',
        prefix: 'twitter.com/'
      },
      instagram: {
        label: 'Instagram Account',
        placeholder: 'something',
        preprefix: 'http://',
        prefix: 'instagram.com/'
      }
    }
  }

  handleChange = (e) => {
    const kind = e.target.dataset.kind
    const val = this.props.value
    if (kind === 'type'){
      // Swap prefixes
      const oldtemplate = this.props.typeTemplates[val.type]
      const newtemplate = this.props.typeTemplates[e.target.value]
      // Clean old prefixs
      val.href = val.href.replace(new RegExp(`^(${oldtemplate.preprefix}|${oldtemplate.prefix})+`), '')
      // Add new prefixes
      if (newtemplate.prefix) val.href = newtemplate.prefix + val.href
      if (newtemplate.preprefix) val.href = newtemplate.preprefix + val.href

      val.type = e.target.value
    } else if (kind === 'text'){
      val.text = e.target.value
    } else if (kind === 'href'){
      const template = this.props.typeTemplates[val.type]
      val.href = `${template.preprefix}${template.prefix}${e.target.value}`
    }
    this.props.onChange(this.props.name, val, this.props.index)
  }

  removeButton = () => {
    this.props.removeElement(this.props.index)
  }

  render(){
    const {type, text, href} = this.props.value
    const template = this.props.typeTemplates[type]
    return (
      <div className="form-group">
        <div className="form-label">
          <label>{this.props.label}</label>
          &nbsp;
          <button className={classNames('btn', 'btn-link', 'btn-sm')} type="button" onClick={this.removeButton}>
            <Icon icon="cross_mark" /> Remove
          </button>
        </div>
        <div className="form-border">
          <div className="form-group">
            <select className="form-select text-capitalize" data-kind="type" onChange={this.handleChange} value={type}>
              {this.props.types.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" type="text" data-kind="text" onChange={this.handleChange} placeholder={this.props.placeholder} value={text} />
          </div>
          <div className="form-group">
            <label className="form-label">{template.label}</label>
            <div className="input-group">
                {template.prefix ? <span className="input-group-addon">{template.prefix}</span> : null}
                <input className="form-input" type="text" data-kind="href" onChange={this.handleChange} placeholder={template.placeholder} value={href.replace(new RegExp(`^(${template.preprefix}|${template.prefix})+`), '')} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
