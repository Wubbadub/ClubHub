import React from 'react'
import Brand from '../parts/Brand'

const bg = require('../../img/splash-bg.jpg')

const Splash = () => {
  return (
    <main className="splash">
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
          <a className="btn btn-lg btn-block btn-primary" href="/create">Create a Website</a>
        </div>
      </section>
    </main>
  )
}

export default Splash
