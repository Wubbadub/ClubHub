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
        <div className="template">
          <div className="header">
            <header className="header">
              <div className="container-lrg flex">
                <div className="col-4">
                  <a><Brand/></a>
                  <div>
                    <Link className="nav-link" to="/editor/create">Log in</Link>
                    <a className="nav-link" href="#" onClick={this.showSignUp}>Sign up</a>
                    <a className="nav-link" target="_blank" href={`mailto:contact@${Config.host}`}>Contact</a>
                  </div>
                </div>
                <div className="col-8">
                  <h1 className="header-heading">Take ten minutes to tell us about your universty club.</h1>
                  <h2 className="header-subheading">In return, we'll generate a beautiful website for you that's ready to share.</h2>
                  <div className="ctas">
                    <div className="onecta"><a className="ctas-button" href="#" onClick={this.showSignUp}>Create my club website</a></div>
                  </div>
                </div>
              </div>
              <div className="container-lrg">
                <div className="col-12">
                  <div className="header-images">
                    <div className="header-images">
                      <div className="centerdevices">
                        <div className="iphoneipad2">
                          <div className="iphone">
                            <div className="mask">
                              <img className="mask-img" src={mobileview}/>
                            </div>
                          </div>
                          <div className="ipad">
                            <div className="mask">
                              <img className="mask-img" src={browserview}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </div>
          <section>
            <ul>
              <div className="feature5 template">
                <div className="container-sml text-center">
                  <h3>It's very simple. Here's all you have to do:</h3>
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
                              <div className="mask"><img className="mask-img" src={browserview}/></div>
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
                            <b>The UVic Art Hive</b>
                            <br/>
                            <a target="_blank" href="http://webdev.uvic.club">hybrid.uvic.club</a>
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
                            <b>UVic Web Dev Club</b>
                            <br/>
                            <a target="_blank" href="http://webdev.uvic.club">webdev.uvic.club</a>
                          </div>
                        </div>
                        <div className="sp-tweets-content">
                          <p>"We didn't even have to buy a domain name. It was is revolutionary"</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="sp-tweets">
                        <div className="flex flexvert">
                          <div>
                            <b>UVic Formula Hybrid</b>
                            <br/>
                            <a target="_blank" href="http://webdev.uvic.club">hybrid.uvic.club</a>
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
                                <a className="ctas-button" onClick={this.showSignUp}>Create my club website</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    )
  }
}
