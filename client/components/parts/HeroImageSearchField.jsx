import React, {Component, PropTypes} from 'react'

export default class HeroImageSearchField extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchKeyword: ''
    }
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired
  }

  searchByKeyword = (e) => {
    this.setState({searchKeyword: [e.target.value] })
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
        <input onChange={this.searchByKeyword} maxLength="64" className="form-input" type="url" value={this.state.searchKeyword}/>
        <div id="thumbnails">
          <img onClick={this.updateHeroImage} height="50" width="80" className="accordion-header" src={`https://source.unsplash.com/category/${this.state.searchKeyword}`} />
        </div>
      </div>
    )
  }
}
