import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import Icon from 'parts/Icon'

import ImageSearchField from 'parts/ImageSearchField'
import ImageUploadField from 'parts/ImageUploadField'

export default class ImageForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  static propTypes = {
    editor: PropTypes.object,
    section: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string
  }

  static defaultProps = {
  }

  selectTab = (i) => {
    this.setState({activeTab: i})
  }

  setImage = (value) => {
    const {editor, name, section} = this.props
    const data = editor.data.sections[section]
    data[name] = value
    this.props.editor.setData(section, data)
  }

  render(){
    const tabs = [
      {
        label: <span><Icon icon="magnifying" /> Search</span>,
        content: <ImageSearchField updateImage={this.setImage} placeholder="e.g. sunset city" />
      },
      {
        label: <span><Icon icon="link" /> Link</span>,
        content: <ImageUploadField updateImage={this.setImage} label="Image URL" placeholder="http://www.example.com/pretty.jpg" />
      }
    ]
    const {label} = this.props
    return (
      <div className="editable-form editable-image-form">
        <div className="editable-form-header">
          <span>{label}</span>
          &nbsp;
          <div className="tabs-toggle btn-group">
          { tabs.map((tab, i) =>
              <button
              type="button"
              className={classNames('btn', 'btn-primary', 'btn-sm', 'tab-toggle', {'active': this.state.activeTab === i})}
              onClick={() => this.selectTab(i)}
              key={`tab-toggle-${i}`}>
                {tab.label}
              </button>
          )}
          </div>
        </div>
        <div className="editable-form-content">
          <form>
            <div className="form-group">
              <div className="tabs-content">
              { tabs.map((tab, i) =>
                <div className={classNames('tab-content', {'active': this.state.activeTab === i})} key={`tab-content-${i}`}>
                  {tab.content}
                </div>
              )}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
