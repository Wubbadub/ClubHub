import React, {Component, PropTypes} from 'react'

import Icon from 'parts/Icon'

import Editable from 'pages/editor/Editable'
import LinksForm from 'pages/editor/forms/LinksForm'

export default class Header extends Component{
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
      <header>
      <Editable edit={edit}
                place="left"
                form={
                  <LinksForm label="Social Links"
                             editor={editor}
                             section="header"
                             name="links"
                             types={['facebook', 'twitter', 'instagram']}
                    />
                }>
        <ul>
          {data.links.map((l, i) => {
            return (<li key={i}><a href={l.href} target="_blank" title={l.text}><Icon icon={`${l.type}_circle`} size={1.5}/></a></li>)
          })}
        </ul>
      </Editable>

      </header>
    )
  }
}
