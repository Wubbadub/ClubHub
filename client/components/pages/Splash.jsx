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
      <main className="splash">
        <SignUp active={this.state.signup} close={this.hideSignUp}/>
        <section className="hero" style={{backgroundImage: `url(${bg})`}}>
          <div className="blurb">
            <h1>
              <Brand />
            </h1>
            <p>
              You want a first point of contact to your university club for potential members and sponsors.
            We offer a simple Q&A interface for university clubs to create beautiful, minimal websites.
            Shoot us an <a href="mailto:contact@hubsite.club" target="_blank">email</a> if you have any questions, or want to learn more about what we do.
          </p>
            <button className="btn btn-lg btn-cta" onClick={this.showSignUp}>Create Your Website</button>
          </div>
        </section>
      </main>
    )
  }
}
