import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Async from 'react-promise'

import Icon from 'parts/Icon'

export default class ImageSearchField extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchKeywords: ['nature', 'water', 'sun'],
      searchRawString: ''
    }

    this.searchTimer
  }

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    updateImage: PropTypes.func.isRequired,
    label: PropTypes.string,
    isActive: PropTypes.bool
  }

  static defaultProps = {
    isActive: true
  }

  updateKeywords = (e) => {
    const newKeywords = (e.target.value).split(' ')
    this.setState({searchKeywords: newKeywords, searchRawString: [e.target.value] })
  }

  handleChange = (e) => {
    this.props.updateImage(e.target.id)
  }


  static unsplashClientId = 'd9ac3268ec6e896a2f2655d25b135b0d22dab5762719fbe4fbc25864860ab8e0'
  // static unsplashClientId = 'ef9e27a50e4d36d08c24bb35f362974c36420854e6924ad0e4b79c4c6dd8b041'

  searchByKeyword = () => new Promise((resolve, reject) => {
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      // Send search request
      fetch(`https://api.unsplash.com/search/photos/?client_id=${this.unsplashClientId}&query=${this.state.searchKeywords}`)
      .then((response) => {
        if (response.okay){
          resolve(response.json().then((json) => (json.results).map((imgObject) =>
            ({
              'thumbnail': imgObject.urls.thumb,
              'full': imgObject.urls.full
            })
          )))
        } else {
          reject(response.status)
        }
      })
    }, 500) // <- Wait 500ms before querying
  })

  render() {
    return (
      <div className={classNames('form-image-search', {'hidden': !this.props.isActive})}>
        <label className={classNames('form-label')}>{this.props.label}</label>
        <input onChange={this.updateKeywords} maxLength="64" className="form-input" type="url" value={this.state.searchRawString} placeholder={this.props.placeholder} />
        <div className="thumbnails">
          <Async
            promise={this.searchByKeyword()}
            then={(imgUrls) =>
              <div className="columns">
                {imgUrls.map((urls, index) =>
                  <img
                    onClick={this.handleChange}
                    className="thumbnail img-responsive rounded column col-6"
                    src={urls.thumbnail}
                    data-full={urls.full}
                    key={`thumbnail-${index}`} />
                  )}
              </div>
            }
            pendingRender={
              <div className="empty empty-small">
                <div className="loading" />
                <p className="empty-title">Searching</p>
              </div>
            }
            catch={(error) =>
              <div className="empty empty-small">
                <Icon icon="warning" size={2} />
                <p className="empty-title">Request Error</p>
                <p className="empty-meta" data-tooltip={`Server returned ${error}`}>Uh oh.</p>
              </div>
            }/>
        </div>
      </div>
    )
  }
}
