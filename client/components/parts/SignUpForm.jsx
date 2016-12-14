import React, {PureComponent} from 'react'
import classNames from 'classnames'
import cookie from 'react-cookie'

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
      clubSiteInput: '',
      clubNameInput: '',
      clubTimeInput: '',
      clubDayInput: '',
      clubLocationInput: '',
      clubTwitterInput: '',
      clubFacebookInput: '',
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
    if (p !== 1) {
      this.setState({page: p + 1})
    } else {
      this.setState({loading: true})
      fetch(`http://${Config.server}/api/newsite/${this.state.clubSiteInput}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': cookie.load('authorization')
        },
        body: JSON.stringify({
          'siteName': this.state.clubNameInput
        })
      }).then((res) => {
        res.json().then((content) => {
          cookie.save('Temporary-Key', content['Temporary-Key'], {
            domain: Config.cookie_path[0],
            path: '/',
            maxAge: 86400
          })
          const request = new Request(
            `http://${Config.server}/api/site/${this.state.clubSiteInput}`, {
              headers: {
                'authorization': cookie.load('authorization'),
                'Temporary-Key': cookie.load('Temporary-Key')
              }
            }
          )
          Promise.resolve(fetch(request).then((response) => response.json().then((site) => {
            site.title = this.state.clubNameInput
            site.sections.hero.title = this.state.clubNameInput

            const links = []
            if (this.state.clubFacebookInput !== '') links.push({
              'type': 'facebook',
              'text': 'Join us on Facebook',
              'href': `http://facebook.com/groups/${this.state.clubFacebookInput}`
            })
            if (this.state.clubTwitterInput !== '') links.push({
              'type': 'twitter',
              'text': 'Follow us on Twitter',
              'href': `http://twitter.com/${this.state.clubTwitterInput}`
            })

            site.sections.header.links = links
            site.sections.hero.buttons = links

            site.sections.meeting.time = this.state.clubTimeInput
            site.sections.meeting.day = this.state.clubDayInput
            site.sections.meeting.place = this.state.clubLocationInput

            fetch(`http://${Config.server}/api/site/${this.state.clubSiteInput}`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': cookie.load('authorization'),
                'Temporary-Key': cookie.load('Temporary-Key')
              },
              body: JSON.stringify(site)
            }).then(() => { window.location.assign(`http://${this.state.clubSiteInput}.${this.props.hostUrl}/edit`) })
          })))
        })
      })
    }
  }

  clubSiteInputChange = (e) => {
    const self = this
    const site = e.target.value.toLowerCase()

    this.setState({clubSiteInput: site, siteInputState: 'testing'})
    this.validateSite(site, function(s) { self.setState({siteInputState: s}) })
  }

  clubNameInputChange = (e) => { this.setState({clubNameInput: e.target.value}) }
  clubTimeInputChange = (e) => { this.setState({clubTimeInput: e.target.value}) }
  clubDayInputChange = (e) => { this.setState({clubDayInput: e.target.value}) }
  clubLocationInputChange = (e) => { this.setState({clubLocationInput: e.target.value}) }
  clubTwitterInputChange = (e) => { this.setState({clubTwitterInput: e.target.value}) }
  clubFacebookInputChange = (e) => { this.setState({clubFacebookInput: e.target.value}) }

  validateSite = (site, callback) => {
    clearTimeout(this.timer)
    const self = this
    if (site === '') return callback('empty')
    else if (!/^[a-zA-Z0-9-]+$/.test(site)) return callback('invalid')

    this.timer = setTimeout(function() {
      Promise.resolve(fetch(`http://${Config.server}/api/site_exists/${self.state.clubSiteInput}`, {
        method: 'GET'
      })).then((res) => {
        res.text().then((t) => {
          callback(t === 'true' ? 'unavailable' : 'okay')
        })
      })
    }, 200)
  }

  siteInputHint = () => {
    const site = this.state.clubSiteInput
    switch (this.state.siteInputState) {
      case 'okay':
        return (<span><b className="siteName">{site}.{this.props.hostUrl}</b> is available!</span>)
      case 'unavailable':
        return (<span><b className="siteName">{site}.{this.props.hostUrl}</b> is unavailable.</span>)
      case 'invalid':
        return (<span><b className="siteName">{site}.{this.props.hostUrl}</b> is invalid.</span>)
      case 'testing':
        return (<span>Checking <b className="siteName">{site}.{this.props.hostUrl}</b>.</span>)
      case 'empty':
        return (<span></span>)
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
      <div className="tabs-content">
        {/* Day of Week */}
        <div className={classNames('tab-content', {'active': this.state.page === 0})}>
          <form>
            <div className="form-group">
              <label className="form-label" htmlFor="club-name-input">What is your club called?</label>
              <input className="form-input" type="text" maxLength="128" id="club-name-input" placeholder="Super cool club name" onChange={this.clubNameInputChange} value={this.state.clubNameInput} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="club-day-input">What day does your club meet? <small>(optional)</small></label>
              <label className="btn-group btn-group-block" id="club-day-input">
                {days.map((day) =>
                  <label key={day} className="btn btn-link btn-radio">
                    <input type="radio" name="club-day-radio" id={`club-day-${day}-radio`} onChange={this.clubDayInputChange} value={day} checked={this.state.clubDayInput === day} />
                    <label htmlFor={`club-day-${day}-radio`}>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                  </label>
                )}
              </label>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="club-time-input">What time does your club meet? <small>(optional)</small></label>
              <input className="form-input" type="text" maxLength="8" id="club-time-input" placeholder="2 AM" onChange={this.clubTimeInputChange} value={this.state.clubTimeInput} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="club-location-input">Where does your club meet? <small>(optional)</small></label>
              <input className="form-input" type="text" maxLength="64" id="club-location-input" placeholder="The roof of ECS" onChange={this.clubLocationInputChange} value={this.state.clubLocationInput} />
            </div>
            <div className="form-group next-action">
              <button type="button" className={classNames('btn', 'btn-primary', 'btn-block', {'disabled': this.state.clubNameInput === ''})} onClick={this.handleNext} >
                Next thing <Icon icon="arrow_right"/>
              </button>
            </div>
          </form>
        </div>
        {/* Social Links */}
        <div className={classNames('tab-content', {'active': this.state.page === 1})}>
          <form>
            <div className={siteInputClass}>
              <label className="form-label" htmlFor="club-site-input">Where should we put your new website?</label>
              <div className="input-group">
                <input type="text" className="form-input" maxLength="24" placeholder="kidz" id="club-site-input" onChange={this.clubSiteInputChange} />
                <span className="input-group-addon">.{this.props.hostUrl}</span>
              </div>
              <span className="form-input-hint">{this.siteInputHint()}</span>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="club-facebook-input">Do you have a facebook group? <small>(optional)</small></label>
              <div className="input-group">
                  <span className="input-group-addon">facebook.com/groups/</span>
                  <input type="text" className="form-input" placeholder="group" id="club-facebook-input" onChange={this.clubFacebookInputChange} value={this.state.clubFacebookInput} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="club-twitter-input">How about a Twitter account? <small>(optional)</small></label>
              <div className="input-group">
                  <span className="input-group-addon">twitter.com/</span>
                  <input type="text" className="form-input" placeholder="account" id="club-twitter-input" onChange={this.clubTwitterInputChange} value={this.state.clubTwitterInput} />
              </div>
            </div>
            <div className="form-group next-action">
              <button type="button" className={classNames('btn', 'btn-primary', 'btn-block', {'disabled': this.state.siteInputState !== 'okay'}, {'loading': this.state.loading})} onClick={this.handleNext}>
                Make my Club website!
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
