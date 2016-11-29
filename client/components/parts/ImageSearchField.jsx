import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

export default class ImageSearchField extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchKeywords: [],
      searchRawString: ''
    }
  }

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    updateImage: PropTypes.func.isRequired,
    isActive: PropTypes.bool
  }

  static defaultProps = {
    isActive: true
  }

  searchByKeyword = (e) => {
    const newKeywords = (e.target.value).split(' ')
    this.setState({searchKeywords: newKeywords, searchRawString: [e.target.value] })
  }

  handleChange = (e) => {
    this.props.updateImage(e.target.src)
  }

  render() {
    // ToDo: create a style file & port 'height', 'width', etc. attributes to it
    return (
      <div className={classNames({'hidden': !this.props.isActive})} id="heroImageSearch" >
        <input onChange={this.searchByKeyword}
               maxLength="64"
               className="form-input"
               type="url"
               value={this.state.searchRawString}
               placeholder={this.props.placeholder} />
        <div className={classNames('columns')} id="thumbnails">
          <div className={classNames('column', 'col-md-3')}>
            <img onClick={this.handleChange}
                 className={classNames('thumbnail')}
                 src={`https://source.unsplash.com/2000x1000/?${this.state.searchKeywords}`} />
          </div>
          {(this.state.searchKeywords).map((keyword) => {
            return (
              <div className={classNames('column', 'col-md-3')} key={keyword}>
                <img onClick={this.handleChange}
                     className={classNames('thumbnail')}
                     src={`https://source.unsplash.com/2000x1000/?${keyword}`}
                     key={keyword+'Img'} />
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}
