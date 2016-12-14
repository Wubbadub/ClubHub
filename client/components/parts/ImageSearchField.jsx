import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class ImageSearchField extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchKeywords: [],
      searchRawString: '',
      photographerInfo: {},
      searchResults: []
    }
  }

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
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

  updateImage = (e) => {
    this.props.handleChange(e.target.id)
  }

  searchByKeyword = () => {
    const unsplashClientId = 'd9ac3268ec6e896a2f2655d25b135b0d22dab5762719fbe4fbc25864860ab8e0'
    // const unsplashClientId = 'ef9e27a50e4d36d08c24bb35f362974c36420854e6924ad0e4b79c4c6dd8b041'
    const unsplashSearchByKeywordUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashClientId}&query=${this.state.searchKeywords}`
    const request = new Request(
      unsplashSearchByKeywordUrl,
      {method: 'GET'}
    )
    this.setState({'searchResults': [] })
    Promise.resolve(fetch(request).then((response) => {
      response.json().then((content) => {
        (content.results).map((imgObject) => {
          const newThumbnails = this.state.searchResults
          let photographerName = `${imgObject.user.first_name}`
          if (imgObject.user.last_name !== null && imgObject.user.last_name !== undefined) {
            photographerName += ` ${imgObject.user.last_name}`
          }
          newThumbnails.push({
            'thumbUrl': imgObject.urls.thumb,
            'fullUrl': imgObject.urls.full,
            'photographer': {
              'name': photographerName,
              'unsplashPage': imgObject.user.links.html
            }
          })
          this.setState({'searchResults': newThumbnails})
        })
      })
    }))
  }

  render() {
    return (
      <div className={classNames({'hidden': !this.props.isActive})} id="heroImageSearch" >
        <label className={classNames('form-label')}>{this.props.label}</label>
        <div className={classNames('input-group')}>
          <input onChange={this.updateKeywords}
                 maxLength="64"
                 className="form-input"
                 type="url"
                 value={this.state.searchRawString}
                 placeholder={this.props.placeholder}/>
          <button onClick={this.searchByKeyword} className={classNames('btn', 'btn-primary', 'input-group-btn')}>Search</button>
        </div>
        <div className={classNames('columns')} id="thumbnails">
          <div className={classNames('column', 'col-md-3')}>
            {
              (this.state.searchResults).map((img, index) => {
                return (
                  <img onClick={this.updateImage}
                       onMouseOver={() => {
                         this.setState({'photographerInfo': img.photographer})
                       }}
                       className={classNames('thumbnail')}
                       src={img.thumbUrl}
                       id={img.fullUrl}
                       key={`img-${index}`} />
                 )
              })
             }
          </div>
        </div>
        <footer className={classNames('centered')}>
          <p>
            <a href="https://www.unsplash.com">Unsplash</a> photo by: <a href={this.state.photographerInfo.unsplashPage}>{this.state.photographerInfo.name}</a>
          </p>
        </footer>
      </div>
    )
  }
}
