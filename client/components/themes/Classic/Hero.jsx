import React, {Component, PropTypes} from 'react'

import Editable from 'pages/editor/Editable'
import TextForm from 'pages/editor/forms/TextForm'
import LinksForm from 'pages/editor/forms/LinksForm'

import Icon from 'parts/Icon'

const bg = require('img/default.png')

export default class Hero extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    editor: PropTypes.object
  }

  getButtonIcon = (type) => {
    switch (type) {
      case 'email':
        return <Icon icon="mail" />
      case 'facebook':
        return <Icon icon="facebook" />
      case 'twitter':
        return <Icon icon="twitter" />
      case 'instagram':
        return <Icon icon="instagram" />
      default:
        return null
    }
  }

  render() {
    let heroImage = null
    if (this.props.data.heroImage === null || this.props.data.heroImage === undefined) {
      heroImage = bg
    } else {
      heroImage = this.props.data.heroImage
    }

    const {editor, data} = this.props
    return (
      <div className="hero-container">
        <div className="hero-image" style={{backgroundImage: `url(${heroImage})`}}>
        </div>
        <div className="hero-content center">
          <h1>
            <Editable form={<TextForm label="Title" editor={editor} section="hero" name="title"/>}>
              {data.title ? data.title : '\u00a0'}
            </Editable>
          </h1>
          <div className="hero-description">
            <Editable form={<TextForm label="Description" editor={editor} section="hero" name="description" long={true}/>}>
              <p>{data.description ? data.description : '\u00a0'}</p>
            </Editable>
          </div>
          <div className="hero-buttons">
            <Editable form={<LinksForm label="Buttons" editor={editor} section="hero" name="buttons"/>}>
            {(this.props.data.buttons).map((b, i) => {
              return (
                <a target="blank" key={i} href={b.href}>{this.getButtonIcon(b.type)}&nbsp;&nbsp;{b.text}</a>
              )
            })}
            </Editable>
          </div>
        </div>
      </div>
    )
  }
}
