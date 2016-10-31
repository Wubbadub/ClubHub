import React, {PureComponent, PropTypes} from 'react'

import * as Themes from './themes'

export default class Site extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    site: PropTypes.object
  }

  shouldComponentUpdate = () => {
    return true
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
