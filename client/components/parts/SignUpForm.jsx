import React, {PureComponent} from 'react'
import classNames from 'classnames'

import Config from 'Config'

import Icon from 'parts/Icon'

// use when state and lifecycle functions are needed
export default class SignUpForm extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
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
      valid: false,
      loading: false
    }

    this.timer // TODO: REMOVE once connect to server
  }


  static propTypes = {
    hostUrl: React.PropTypes.string
  }

  static defaultProps = {
    hostUrl: Config.subhosts[0]
  }

  handleNext = () => {
    const p = this.state.page
    if (p !== 2) {
      this.setState({page: p + 1})
    }
    // this.setState({loading: true})
    // fetch(`http://${Config.server}/api/newsite/${this.state.siteInput}`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({'siteName': 'FIX ME'})
    // }).then(() => {
    //   window.location.assign(`http://${this.state.siteInput}.${this.props.hostUrl}/edit`)
    // })
  }

  siteChange = (e) => {
    const self = this
    const site = e.target.value.toLowerCase()

    this.setState({siteInput: site, siteInputState: 'testing'})
    this.validateSite(site, function(s) { self.setState({siteInputState: s}) })
  }

  validateSite = (site, callback) => {
    clearTimeout(this.timer)
    const self = this
    if (site === '') return callback('empty')
    else if (!/^[a-zA-Z0-9-]+$/.test(site)) return callback('invalid')

    this.timer = setTimeout(function() {
      Promise.resolve(fetch(`http://${Config.server}/api/site_exists/${self.state.siteInput}`, {
        method: 'GET'
      })).then((res) => {
        res.text().then((t) => {
          callback(t === 'true' ? 'unavailable' : 'okay')
        })
      })
    }, 200)
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
      case 'empty':
        return (<span>&nbsp;</span>)
      default:
        console.error('Unexpected input state: %s', this.state.siteInputState)
        return (<span>&nbsp;</span>)
    }
  }


  render() {
    const siteInputClass = classNames(
    'form-group',
      {'has-success': this.state.siteInputState === 'okay'},
      {
        'has-danger':
        this.state.siteInputState === 'invalid' ||
        this.state.siteInputState === 'unavailable'
      }
    )

    const days = ['mon', 'tue', 'wed', 'thu', 'fri']

    return (
      <div className="tabs">
        {/* Name and Url */}
        <div className={classNames('tab', {'active': this.state.page === 0})}>
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="club-name-input">What's your Club name?</label>
              <input className="form-input"
                type="text"
                maxLength="128"
                id="club-name-input"
                placeholder="UVic Kool Kidz Club" />
            </div>
            <div className={siteInputClass}>
              <label className="form-label" htmlFor="club-site-input">Where should we put your new website?</label>
              <div className="input-group">
                <input type="text"
                  className="form-input"
                  maxLength="24"
                  placeholder="kidz"
                  id="club-site-input"
                  onChange={this.siteChange} />
                <span className="input-group-addon">.{this.props.hostUrl}</span>
              </div>
              <span className="form-input-hint">{this.siteInputHint()}</span>
            </div>
            <div className="form-group">
              <button type="button"
                className={classNames(
                  'btn', 'btn-default', 'btn-block',
                  {'disabled': this.state.siteInputState !== 'okay'},
                  {'loading': this.state.loading}
                )}
                onClick={this.handleNext}
                >
                Next thing&nbsp;&nbsp;<Icon icon="arrow_right"/>
              </button>
            </div>
          </form>
        </div>
        {/* Day of Week */}
        <div className={classNames('tab', {'active': this.state.page === 1})}>
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="club-name-input">What day does your club meet?</label>
              <label className="btn-group btn-group-block">
                {days.map((day) =>
                  <label key={day} className="btn btn-link btn-radio">
                    <input type="radio" name="options" id={`day-${day}`}/>
                    <label htmlFor={`day-${day}`}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                  </label>
                )}
              </label>
            </div>
            <div className="form-group">
              <button type="button"
                className={classNames(
                  'btn', 'btn-default', 'btn-block',
                  {'disabled': this.state.siteInputState !== 'okay'},
                  {'loading': this.state.loading}
                )}
                onClick={this.handleNext}
                >
                Almost done!&nbsp;&nbsp;<Icon icon="arrow_right"/>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
