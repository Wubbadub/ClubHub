import React, {PureComponent, PropTypes} from 'react'
import ImageSearchField from 'parts/ImageSearchField'
import ImageUploadField from 'parts/ImageUploadField'
import classNames from 'classnames'

export default class HeroImageField extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      tabStates: this.getInitialTabStates()
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  getInitialTabStates = () => {
    return ({
      'search': {
        'isActive': true
      },
      'url': {
        'isActive': false
      }
    })
  }

  selectTab = (e) => {
    const tId = e.target.id
    const tStates = this.state.tabStates
    if (tStates[tId].isActive) return

    const allTabs = Object.keys(tStates)
    for (let i = 0; i < allTabs.length; i++){
      if (tStates[allTabs[i]].isActive){
        tStates[allTabs[i]].isActive = false
        break
      }
    }
    tStates[tId].isActive = true
    this.setState({tabStates: tStates})
  }

  updateHeroImage = (url) => {
    this.props.onChange('heroImage', url)
  }

  render() {
    // ToDo: move styling to seperate file
    // ToDo: use an icon as for tab title e.g. magnifying glass in place of "Search"
    const tabStyle = {
      'cursor': 'pointer'
    }
    return (
      <div className={classNames('form-group')} >
        <label className={classNames('form-label')}>Image</label>
        <ul className="tab tab-block pt-5">
          <li id="search"
              onClick={this.selectTab}
              style={tabStyle}
              className={classNames('tab-item', {'active': this.state.tabStates['search'].isActive})}>
              <a id="search">Search</a>
          </li>
          <li id="url"
              onClick={this.selectTab}
              style={tabStyle}
              className={classNames('tab-item', {'active': this.state.tabStates['url'].isActive})}>
              <a id="url">Link</a>
          </li>
        </ul>
        <ImageSearchField isActive={this.state.tabStates['search'].isActive}
                          updateImage={this.updateHeroImage}
                          placeholder={'e.g. \"sunset city\"'} />
        <ImageUploadField isActive={this.state.tabStates['url'].isActive}
                          updateImage={this.updateHeroImage}
                          label="URL"
                          placeholder="http://www.example.com/pretty.jpg" />
      </div>
    )
  }
}
