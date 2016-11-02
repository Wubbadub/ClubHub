import React, {Component, PropTypes} from 'react'
import Icon from 'parts/Icon'

export default class Hero extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    site: PropTypes.object
  }

  render() {
    const links = this.props.site.sections.header.links
    return (
      <header>
          <ul>
            {links.map((l, i) => {
              return (<li key={i}><a href={l.href} target="_blank" title={l.text}><Icon icon={`${l.type}_circle`} size={1.5}/></a></li>)
            })}
          </ul>
      </header>
    )
  }
}
