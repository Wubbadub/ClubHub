import React, {PureComponent, PropTypes} from 'react'

import * as Themes from './themes'

export default class Site extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    route: PropTypes.object
  }

  render() {
    const Theme = Themes[this.props.route.site.theme]
    return (
    <div className="site">
      <Theme site={this.props.route.site}/>
    </div>
    )
  }
}
