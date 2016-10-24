import React/*, {PropTypes}*/ from 'react'

const bg = require('../../img/splash-bg.jpg')

// use when state and lifecycle functions are not needed
const Splash = (/*props*/) => {
  // const {} = props
  // const containerStyle = {
  //   backgroundImage: bg,
  //   justifyContent: 'center',
  //   backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   height: 'calc(100vh - 6vh)',
  //   minHeight: '400px',
  //   margin: '3vh',
  //   display: 'flex',
  //   backgroundColor: '999'
  // }

  console.log(bg)
  return (
    <main className="splash">
      <section className="hero" style={{backgroundImage: `url(${bg})`}}>
        <div className="blurb">
          <p>
            You want a first point of contact to your university club for potential members and sponsors.
            We offer a simple Q&A interface for university clubs to create beautiful, minimal websites.
            Shoot us an <a href="mailto:contact@hubsite.club" target="_blank">email</a> if you have any questions, or want to learn more about what we do.
          </p>
          <a className="btn btn-lg btn-block btn-primary" href="/create">Create a Website</a>
        </div>
      </section>
    </main>
  )
}

// Splash.propTypes = {
// }

// Splash.defaultProps = {
// }

export default Splash
