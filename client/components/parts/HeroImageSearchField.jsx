import React, {Component, PropTypes} from 'react'

export default class HeroImageSearchField extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchKeywords: [],
      searchRawString: ''
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  searchByKeyword = (e) => {
    const newKeywords = (e.target.value).split(' ')
    this.setState({searchKeywords: [newKeywords], searchRawString: [e.target.value] })
  }

  updateHeroImage = (e) => {
    const url = e.target.src
    this.props.onChange('heroImage', url)
  }

  render() {
    // ToDo: create a style file & port 'height', 'width', etc. attributes to it
    return (
      <div id="heroImageSearch" >
        <label className="form-label">Search Image</label>
        <input onChange={this.searchByKeyword} maxLength="64" className="form-input" type="url" value={this.state.searchRawString}/>
        <div id="thumbnails">
          <img onClick={this.updateHeroImage} height="70" width="80" className="accordion-header" src={`https://source.unsplash.com/2000x1000/?${this.state.searchKeywords}`} />
          <img onClick={this.updateHeroImage} height="70" width="80" className="accordion-header" src={`https://source.unsplash.com/2000x1000/?${this.state.searchKeywords}`} />
          <img onClick={this.updateHeroImage} height="70" width="80" className="accordion-header" src={`https://source.unsplash.com/2000x1000/?${this.state.searchKeywords}`} />
        </div>
      </div>
    )
  }
}
