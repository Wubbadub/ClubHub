import React, {PureComponent} from 'react'
import classNames from 'classnames'

// use when state and lifecycle functions are needed
export default class SignUpForm extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      siteInputState: 'empty',
      /*
      Site Input States:
        - empty
        - okay
        - invalid
        - unavailable
        - testing
      */
      siteInput: '',
      valid: false
    }

    this.timer // TODO: REMOVE once connect to server
  }


  static propTypes = {
    hostUrl: React.PropTypes.string
  }

  static defaultProps = {
    hostUrl: 'uvic.club'
  }

  siteChange = (e) => {
    const self = this
    const site = e.target.value

    this.setState({siteInput: site, siteInputState: 'testing'})

    this.validateSite(site, function(s){ self.setState({siteInputState: s}) })
  }

  validateSite = (site, callback) => {
    clearTimeout(this.timer) // TODO: REMOVE once connect to server
    if (site === '') return callback('empty')
    else if (!/^[a-zA-Z0-9-]+$/.test(site)) return callback('invalid')

    // TODO: Test with the DB, This simulates a server call
    this.timer = setTimeout(function() {
      callback(site === 'taken' ? 'unavailable' : 'okay')
    }, 200) // TODO: REMOVE once connect to server
  }

  siteInputHint = () => {
    const siteInput = this.state.siteInput
    switch (this.state.siteInputState) {
      case 'okay':
        return (<span><b className="siteName">{siteInput}.{this.props.hostUrl}</b> is available!</span>)
      case 'unavailable':
        return (<span><b className="siteName">{siteInput}.{this.props.hostUrl}</b> is unavailable.</span>)
      case 'invalid':
        return (<span><b className="siteName">{siteInput}.{this.props.hostUrl}</b> is invalid.</span>)
      case 'testing':
        return (<span>Checking <b className="siteName">{siteInput}.{this.props.hostUrl}</b>.</span>)
      default:
        return (<span>&nbsp;</span>)
    }
  }

  render() {
    const siteInputClasses = classNames(
      'form-group',
      {'has-success': this.state.siteInputState === 'okay'},
      {
        'has-danger':
        this.state.siteInputState === 'invalid' ||
        this.state.siteInputState === 'unavailable'
      }
    )

    return (
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="club-name-input">Club Name</label>
          <input className="form-input"
                 type="text"
                 maxLength="128"
                 id="club-name-input"
                 placeholder="UVic Kool Kidz Club" />
        </div>
        <div className={siteInputClasses}>
          <label className="form-label" htmlFor="club-site-input">Club Address</label>
          <div className="input-group">
              <input type="text"
                     className="form-input"
                     maxLength="24"
                     placeholder="kidz"
                     id="club-site-input"
                     onChange={this.siteChange}/>
              <span className="input-group-addon">.{this.props.hostUrl}</span>
          </div>
          <span className="form-input-hint">{this.siteInputHint()}</span>
        </div>
      </form>
    )
  }
}
