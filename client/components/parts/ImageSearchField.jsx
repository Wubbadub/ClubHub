import React, {Component, PropTypes} from 'react'
import Async from 'react-promise'

import Config from 'Config'

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
    updateImage: PropTypes.func.isRequired
  }

  updateKeywords = (e) => {
    const newKeywords = (e.target.value).split(' ')
    this.setState({searchKeywords: newKeywords, searchRawString: [e.target.value] })
  }

  handleChange = (e) => {
    this.props.updateImage(e.target.dataset['url'])
  }


  // Clubhub Client ID: d9ac3268ec6e896a2f2655d25b135b0d22dab5762719fbe4fbc25864860ab8e0
  // Juan's  Client ID: ef9e27a50e4d36d08c24bb35f362974c36420854e6924ad0e4b79c4c6dd8b041

  searchByKeyword = () => new Promise((resolve, reject) => {
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      // Send search request
      fetch(`https://api.unsplash.com/search/photos/?client_id=${Config.unsplash_client_id}&query=${this.state.searchKeywords}`)
      .then((response) => {
        if (response.ok){
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
      <div className="form-image-search">
        <input onChange={this.updateKeywords} maxLength="64" className="form-input" type="url" value={this.state.searchRawString} placeholder={this.props.placeholder} />
        <div className="thumbnails">
          <Async
            promise={this.searchByKeyword()}
            then={(imgUrls) =>
              <div className="columns col-gapless">
                {imgUrls.slice(0, 4).map((urls, index) =>
                  <div className="column col-6 thumbnail" key={`thumbnail-${index}`}>
                    <button type="button" className="btn btn-link btn-thumbnail" onClick={this.handleChange}>
                      <img className="img-responsive rounded" src={urls.thumbnail} data-url={urls.full} />
                    </button>
                  </div>
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
