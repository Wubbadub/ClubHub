import React, {PureComponent} from 'react'
import {Link} from 'react-router'

import Config from 'Config'

import SignUp from 'parts/SignUp'
import Brand from 'parts/Brand'

const browserview = require('../../img/browser-view.png')
const mobileview = require('../../img/mobile-view.png')
const seo = require('../../img/seo-optimize.svg')
const transfer = require('../../img/transfer.svg')

export default class Splash extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      signup: false
    }
  }

  // static propTypes = {
  // }

  // static defaultProps = {
  // }

  showSignUp = () => {
    this.setState({signup: true})
  }

  hideSignUp = () => {
    this.setState({signup: false})
  }

  render() {
    return (
      <div className="splash">
        <SignUp active={this.state.signup} close={this.hideSignUp}/>
        <div className="header">
          <div className="container-lrg">
            <div className="col-12 spread">
              <div>
                <a><Brand/></a>
              </div>
              <div>
                <Link className="btn btn-link nav-link" to="/editor/create">Log in</Link>
                <button type="button" className="btn btn-link nav-link" href="#" onClick={this.showSignUp}>Sign up</button>
                <a className="btn btn-link nav-link" target="_blank" href={`mailto:contact@${Config.host}`}>Contact</a>
              </div>
            </div>
          </div>
          <div className="container-sml">
            <div className="col-12 text-center">
              <h1>Provide the resources your university club needs, all you have to do is answer a few questions.</h1>
              <h2>
                You don’t even need to worry about buying a domain or serving your website.
                We give you a live, beautiful website that's ready to share within the first five minute of joining.
              </h2>
              <div className="ctas">
                <button type="button" className="btn ctas-button" onClick={this.showSignUp}>Start Creating</button>
              </div>
            </div>
          </div>
          <div className="container-lrg">
            <div className="col-12">
              <div className="header-images">
                <div className="iphone">
                  <div className="mask">
                    <img className="mask-img" src={mobileview}/>
                  </div>
                </div>
                <div className="browser">
                  <div className="mask">
                    <img className="mask-img" src={browserview}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-lrg columns element-container">
            <div className="col-6 text-center">
              <img src={seo}/>
              <h2>
                We make sure to serve your website right so your club website
                can gain traffic from organic google searches.
              </h2>
            </div>
            <div className="col-6 text-center">
              <img src={transfer}/>
              <h2>
                Using Clubhub makes it easy for you and your club members to
                maintain and transfer ownership.
              </h2>
            </div>
          </div>
          <div className="container-lrg second-cta">
            <div className="col-12 text-center">
              <h1>Spend less time sweating the details and more time enjoying your club.</h1>
              <div className="ctas">
                <button type="button" className="btn ctas-button" onClick={this.showSignUp}>Get started in minutes</button>
              </div>
              <div className="footer">
                <a><Brand/></a>
                <a className="footer-link" target="_blank" href={`mailto:contact@${Config.host}`}>Email Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
