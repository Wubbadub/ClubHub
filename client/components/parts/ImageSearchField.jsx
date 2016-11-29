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
    this.setState({searchKeywords: [newKeywords], searchRawString: [e.target.value] })
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
        <div id="thumbnails">
          <img onClick={this.handleChange}
               height="60px"
               width="96px"
               className={classNames('thumbnail')}
               src={`https://source.unsplash.com/2000x1000/?${this.state.searchKeywords}`} />
        </div>
      </div>
    )
  }
}
