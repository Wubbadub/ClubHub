import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import Async from 'react-promise'

export default class ImageSearchField extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchKeywords: ['nature', 'water', 'sun'],
      searchRawString: ''
    }
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

  searchByKeyword = () => {
    const unsplashClientId = 'd9ac3268ec6e896a2f2655d25b135b0d22dab5762719fbe4fbc25864860ab8e0'
    // const unsplashClientId = 'ef9e27a50e4d36d08c24bb35f362974c36420854e6924ad0e4b79c4c6dd8b041'
    const unsplashSearchByKeywordUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${this.state.searchKeywords}`
    const request = new Request(
      unsplashSearchByKeywordUrl,
      {method: 'GET'}
    )
    return Promise.resolve(fetch(request).then((response) => {
      return response.json().then((content) => {
        return (content.results).map((imgObject) => {
          return {
            'thumbnail': imgObject.urls.thumb,
            'full': imgObject.urls.full
          }
        })
      })
    }))
  }

  render() {
    // ToDo: create a style file & port 'height', 'width', etc. attributes to it
    return (
      <div className={classNames({'hidden': !this.props.isActive})} id="heroImageSearch" >
        <label className={classNames('form-label')}>{this.props.label}</label>
        <input onChange={this.updateKeywords}
               maxLength="64"
               className="form-input"
               type="url"
               value={this.state.searchRawString}
               placeholder={this.props.placeholder} />
        <div className={classNames('columns')} id="thumbnails">
          <div className={classNames('column', 'col-md-3')}>
            <Async
              promise={this.searchByKeyword()}
              then={(imgUrls) => {
                return (
                  <div>
                    {
                      imgUrls.map((urls, index) => {
                        return (
                          <img onClick={this.handleChange}
                               className={classNames('thumbnail')}
                               src={urls.thumbnail}
                               id={urls.full}
                               key={`img${index}`} />
                         )
                      })
                     }
                   </div>
                 )
              }}>
            </Async>
          </div>
        </div>
      </div>
    )
  }
}
