import React, {Component, PropTypes} from 'react'

import * as Themes from './themes'

export default class Site extends Component{
  constructor(props){
    super(props)
    console.log(props.site)
  }

  static propTypes = {
    site: PropTypes.object
  }

  render() {
    const Theme = Themes[this.props.site.theme]
    return (
    <div className="site">
      <Theme site={this.props.site}/>
    </div>
    )
  }
}
