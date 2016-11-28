import React, {Component, PropTypes} from 'react'
import HeroImageSearchField from 'parts/HeroImageSearchField'

export default class HeroImageField extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  render() {
    // ToDo: create separate file for styling
    // ToDo: implement tabs each image selection method
    // ToDo: use an icon as for tab title e.g. magnifying glass in place of "Search"
    // ToDo: implement url
    return (
      <div className="form-group" >
        <HeroImageSearchField onChange={this.props.onChange} />
      </div>
    )
  }
}
