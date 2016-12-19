import React, {PureComponent, PropTypes} from 'react'
import classNames from 'classnames'

import Icon from 'parts/Icon'

import ImageSearchField from 'parts/ImageSearchField'
import ImageUploadField from 'parts/ImageUploadField'

export default class ImageField extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  selectTab = (i) => {
    this.setState({activeTab: i})
  }

  updateHeroImage = (url) => {
    this.props.onChange('heroImage', url)
  }

  render() {
    const tabs = [
      {
        label: <span><Icon icon="magnifying" /> Search</span>,
        content: <ImageSearchField updateImage={this.updateHeroImage} placeholder={'e.g. sunset city'} />
      },
      {
        label: <span><Icon icon="link" /> Link</span>,
        content: <ImageUploadField updateImage={this.updateHeroImage} label="Image URL" placeholder="http://www.example.com/pretty.jpg" />
      }
    ]
    return (
      <div className="form-group">
        <div className="form-label">
          <label>Main Image</label>
          &nbsp;
          <div className="tabs-toggle btn-group">
          { tabs.map((tab, i) =>
              <button
              type="button"
              className={classNames('btn', 'btn-default', 'btn-sm', 'tab-toggle', {'active': this.state.activeTab === i})}
              onClick={() => this.selectTab(i)}
              key={`tab-toggle-${i}`}>
                {tab.label}
              </button>
          )}
          </div>
        </div>
        <div className="tabs-content">
        { tabs.map((tab, i) =>
          <div className={classNames('tab-content', {'active': this.state.activeTab === i})} key={`tab-content-${i}`}>
            {tab.content}
          </div>
        )}
        </div>
      </div>
    )
  }
}
