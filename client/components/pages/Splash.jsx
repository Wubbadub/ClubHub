import React, {PureComponent} from 'react'

import SignUp from 'parts/SignUp'
import Brand from 'parts/Brand'

const bg = require('../../img/splash-bg.jpg')

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
        <header className="header">
          <div className="container-lrg">
            <div className="col-12 spread">
              <div>
                <a><Brand/></a>
              </div>
              <div>
                <a className="nav-link" href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="container-sml">
            <div className="col-12 text-center">
              <h1 className="header-heading">Provide your university club with the resources it needs.</h1>
              <h2 className="header-subheading">Creating a website with us takes less than ten minutes.
                We host the website for you and give you a url so you can start sharing your website to students, members, and sponsors.</h2>
              <div className="ctas">
                <a className="ctas-button" href="#" onClick={this.showSignUp}>Start Creating</a>
              </div>
            </div>
          </div>
          <div className="container-lrg">
            <div className="col-12">
              <div className="header-images">
                <div className="iphone">
                  <div className="mask">
                    <img className="mask-img" src={bg}/>
                  </div>
                </div>
                <div className="browser">
                  <div className="mask">
                    <img className="mask-img" src={bg}/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}
