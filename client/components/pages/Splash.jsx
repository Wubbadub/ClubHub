import React, {PureComponent} from 'react'
import LoginButton from 'parts/LoginButton'

import Config from 'Config'

import SignUp from 'parts/SignUp'
import Brand from 'parts/Brand'
import Icon from 'parts/Icon'

const browserview = require('../../img/browser-view-2.png')
const computerview = require('../../img/browser-view-3.png')
const mobileview = require('../../img/mobile-view.png')

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
        <div className="template">
          <div className="header">
            <div className="container-lrg flex">
              <div className="col-4">
                <a><Brand/></a>
                <div>
                  <LoginButton className="nav-link">Log In</LoginButton>
                  {/*<a className="nav-link" href="#" onClick={this.showSignUp}>Sign up</a>*/}
                  <a className="nav-link" target="_blank" href={`mailto:contact@${Config.host}`}>Contact</a>
                </div>
              </div>
              <div className="col-8">
                {/*<h1 className="header-heading">You take ten minutes to tell us about your university club. We give you a website.</h1>*/}
                <h1 className="header-heading">Welcome back Brendon.</h1>
                <div className="ctas">
                  {/*<div className="onecta"><a className="ctas-button" href="#" onClick={this.showSignUp}>Get started</a></div>*/}
                  <div className="onecta dropdown">
                    <a className="ctas-button" href="#">Edit<Icon icon="chevron_down"/></a>
                      <div className="dropdown-menu">
                        <a href="#">The Art Hive</a>
                        <a href="#">Formula One</a>
                        <a href="#">The UVic Dogwood Initiative</a>
                    </div>
                  </div>
                  <div className="onecta"><a className="ctas-button create-new-site" href="#">+ Create New Site</a></div>
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
          </div>
          <section>
            <ul>
              <div className="feature5 template">
                <div className="container-sml text-center col-12">
                  <h3>Your website is live and ready to share the moment you start creating.</h3>
                </div>
                <div className="container-lrg flex">
                  <div className="col-6 centervertical">
                    <div className="f5">
                      <div className="steps">
                        <div className="steps-img">💬</div>
                        <h3>Answer some questions</h3>
                        <p className="header-subheading">What's your club name? What days do you meet? What do you want your website address to be?</p>
                      </div>
                      <div className="steps">
                        <div className="steps-img">✏️</div>
                        <h3>Customize your content</h3>
                        <p className="header-subheading">Add more content that's relevant to your club like social media links and important club members</p>
                      </div>
                      <div className="steps">
                        <div className="steps-img">🌎</div>
                        <h3>Save, it's ready to share!</h3>
                        <p className="header-subheading">Start sharing your website with members, potential recruits, and sponsors!&nbsp;</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="header-images">
                      <div className="header-images">
                        <div className="sidedevices">
                          <div className="computerwrapper">
                            <div className="computer">
                              <div className="mask"><img className="mask-img" src={computerview}/></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </section>
          <div className="socialprooftemplate">
            <div className="template">
              <div className="container-sml">
                <div className="flex text-center">
                  <div className="col-12">
                    <h3 className=" editable">Join the Clubhub community.&nbsp;</h3></div>
                  </div>
                </div>
                <div className="container-lrg">
                  <div className="tweets flex">
                    <div className="col-4">
                      <div className="sp-tweets">
                        <div className="flex flexvert">
                          <div>
                            <h5>The UVic Art Hive</h5>
                            <br/>
                            <a target="_blank" href="http://arthive.uvic.club">arthive.uvic.club</a>
                          </div>
                        </div>
                        <div className="sp-tweets-content">
                          <p>"The best part was choosing the image!"</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="sp-tweets">
                        <div className="flex flexvert">
                          <div>
                            <h5>UVic Dogwood Initiative</h5>
                            <br/>
                            <a target="_blank" href="http://dogwood.uvic.club">dogwood.uvic.club</a>
                          </div>
                        </div>
                        <div className="sp-tweets-content">
                          <p>"We didn't even have to buy a domain name. It was revolutionary"</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="sp-tweets">
                        <div className="flex flexvert">
                          <div>
                            <h5>UVic Formula Hybrid</h5>
                            <br/>
                            <a target="_blank" href="http://formulahybrid.uvic.club">formulahybrid.uvic.club</a>
                          </div>
                        </div>
                        <div className="sp-tweets-content">
                          <p>"We now have a beautiful website now to show off to sponsors. Feels good man."</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="template">
              <div className="footerblock">
                  <div className="container-sml flex text-center">
                      <div className="col-12">
                          <h3>Stop sweating the details and spend more time enjoying your club.</h3>
                          <div className="ctas">
                                <a className="ctas-button" onClick={this.showSignUp}>Get started</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    )
  }
}
