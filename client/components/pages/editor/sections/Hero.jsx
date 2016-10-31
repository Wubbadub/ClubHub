import React, {PureComponent, PropTypes} from 'react'
// import classNames from 'classnames'

import ShortTextInput from 'parts/ShortTextInput'

export default class Hero extends PureComponent{
  constructor(props){
    super(props)
  }

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  }


  render(){
    return (
      <div>
        <ShortTextInput />
        <ShortTextInput />
      </div>
    )
  }
}
