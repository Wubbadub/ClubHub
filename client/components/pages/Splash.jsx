import React, {PropTypes} from 'react'

// use when state and lifecycle functions are not needed
const Splash = (props) => {
  // const {} = props

  return (
    <div className="container">
      <div className="columns">
        <div className="column col-4"></div>
        <div className="column col-4">
        <p>
          We make it really easy for club leaders to make great looking websites. Not only does it take less than 10 minutes to make a website with us, it's even easier to maintain and transfer ownership to your new club leader. Shoot us an <a href="mailto:contact@hubsite.club" target="_blank">email</a> if you have any questions, or want to learn more about what we do.
        </p>
        <a className="btn btn-lrg btn-block btn-primary" href="/create">Create a Website</a>
        </div>
      </div>
    </div>
  )
}

Splash.propTypes = {
}

Splash.defaultProps = {
}

export default Splash
