import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import * as Themes from './themes'

export default class Site extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    site: PropTypes.object.isRequired,
    editor: PropTypes.object
  }

  static defaultProps = {
    editor: null
  }

  render() {
    const Theme = Themes[this.props.site.theme]
    return (
    <div className={classNames('site', {'edit': this.props.editor})}>
      <Theme site={this.props.site} editor={this.props.editor}/>
    </div>
    )
  }
}
